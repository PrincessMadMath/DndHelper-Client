/* Utils */
import React from "react";

export default class MultiSelect extends React.Component {
    // Todo[kfedorov]: Add PropTypes
    static DEFAULT_OPTION_VALUE = "DEFAULT OPTION VALUE";

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
            options: options,
        };
    }

    handleChange = event => {
        const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value);

        if (
            selectedOptions.length === 0 ||
            (selectedOptions.length === 1 &&
                selectedOptions[0] === MultiSelect.DEFAULT_OPTION_VALUE)
        ) {
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
                            selectedOptions.some(sO => f_flat.toLowerCase().includes(sO))
                        )
                )
            );
        }
    };

    render() {
        return (
            <select multiple onChange={this.handleChange}>
                <option value={MultiSelect.DEFAULT_OPTION_VALUE}>
                    {" "}
                    - Filter By {this.props.fieldName} -
                </option>
                {this.state.options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
}
