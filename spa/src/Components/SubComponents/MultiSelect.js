/* Utils */
import React from "react";

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: new Set(this.props.items.flat().map(v => v.trim().toLowerCase())),
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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
    }

    render() {
        return (
            <select multiple onChange={this.handleChange}>
                {[...this.state.options].sort().map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    }
}
