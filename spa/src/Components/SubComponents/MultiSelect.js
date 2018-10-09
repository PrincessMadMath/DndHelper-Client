/* Utils */
import React from "react";

export default class MultiSelect extends React.Component {
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
            options: options
        };
    }

    handleChange = event => {
        const selectedOptions = [...event.target.options].filter(o => o.selected).map(o => o.value);

        if (selectedOptions.length === 0) {
            this.props.callback(new Array(this.props.items.length).fill(true));
        } else {
            this.props.callback(
                // Todo[kfedorov]: Maybe refactor this so its more readable
                // This handles both the cases where the prop.sitems are of the shape [string, string, ...]
                // or [[string, string], [string], ...]
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
                {this.state.options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
}
