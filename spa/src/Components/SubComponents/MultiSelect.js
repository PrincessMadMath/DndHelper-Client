/* Utils */
import React from "react";
import Select from "react-select";
import Filter from "../StyledComponent/Filter";
import queryString from "query-string";

export default class MultiSelect extends React.Component {
    // Todo[kfedorov]: Add PropTypes
    constructor(props) {
        super(props);

        let uniqueOptions = new Set(
            this.props.items.flat().map(v => (typeof v === "string" ? v.trim().toLowerCase() : v))
        );
        let options;
        if (this.props.compareFunc) {
            options = [...uniqueOptions].sort(this.props.compareFunc);
        } else {
            options = [...uniqueOptions].sort();
        }

        if (this.props.urlKey) {
            let initialValueString = queryString.parse(window.location.search)[this.props.urlKey];
            if (initialValueString) {
                this.initialValue = initialValueString
                    .split(",")
                    .map(s => ({ label: s, value: s }));
                this.handleChange(this.initialValue);
            }
        }

        this.state = {
            options: options.map(o => ({ value: o, label: o })),
        };
    }

    handleChange = selectedOptions => {
        let selectedValues = selectedOptions.map(o => o.value);

        if (this.props.nomasks) {
            if (selectedValues.length === 0) {
                this.props.callback(this.state.options.map(o => o.value));
            } else {
                this.props.callback(selectedValues);
            }
        } else {
            if (selectedValues.length === 0) {
                this.props.callback(new Array(this.props.items.length).fill(true));
            } else {
                this.props.callback(
                    // Todo[kfedorov]: Maybe refactor this so its more readable
                    // This handles both the cases where the prop.sitems are of the shape [string, string, ...] ex. Spell range
                    // or [[string, string], [string], ...] ex. Spell caster class
                    this.props.items.map(f =>
                        [f]
                            .flat()
                            .some(f_flat =>
                                selectedValues.some(sO => f_flat.trim().toLowerCase() === sO)
                            )
                    )
                );
            }
        }

        if (this.props.urlKey) {
            let currentQueryString = queryString.parse(window.location.search);
            currentQueryString[this.props.urlKey] = selectedValues.join(",");
            window.history.replaceState(
                null,
                null,
                "?" + queryString.stringify(currentQueryString)
            );
        }
    };

    render() {
        return (
            <Filter>
                <Select
                    className="w5"
                    options={this.state.options}
                    onChange={this.handleChange}
                    defaultValue={this.initialValue}
                    isMulti={true}
                    placeholder={" - Filter by " + this.props.fieldName + " - "}
                />
            </Filter>
        );
    }
}
