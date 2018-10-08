import React, { Component } from "react";
import PropTypes from "prop-types";

export default class MonsterFilter extends Component {
    static propTypes = {
        onFilterUpdate: PropTypes.func.isRequired,
    };

    state = {
        name: "",
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        const newState = {
            ...this.state,
            [name]: value,
        };

        this.setState(newState);

        this.props.onFilterUpdate(newState);
    };

    render() {
        return (
            <div>
                <label>
                    Name:
                    <input name="name" type="text" onChange={this.handleInputChange} />
                </label>
            </div>
        );
    }
}
