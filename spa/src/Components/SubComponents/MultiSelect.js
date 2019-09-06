/* Utils */
import React from "react";
import Select from "react-select";
import Filter from "../StyledComponent/Filter";

export default class MultiSelect extends React.Component {
    // Todo[kfedorov]: Add PropTypes
    constructor(props) {
        super(props);

        let uniqueOptions = new Set(this.props.items.flat().map(v => v.trim().toLowerCase()));
        let options;
        if (this.props.compareFunc) {
            options = [...uniqueOptions].sort(this.props.compareFunc);
        } else {
            options = [...uniqueOptions].sort();
        }

        this.state = {
            options: options.map(o => ({ value: o, label: o })),
        };
    }

    handleChange = selectedOptions => {
        let selectedValues = (selectedOptions === null ? [] : selectedOptions).map(o => o.value);

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
    };

    render() {
        return (
            <Filter>
                <Select
                    className="w5"
                    options={this.state.options}
                    onChange={this.handleChange}
                    isMulti={true}
                    placeholder={" - Filter by " + this.props.fieldName + " - "}
                />
            </Filter>
        );
    }
}
