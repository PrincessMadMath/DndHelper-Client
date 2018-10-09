/* Utils */
import React from "react";
import PropTypes from "prop-types";

export default class SearchBox extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        fieldName: PropTypes.string.isRequired,
    };

    handleChange = event => {
        const searchTerm = event.target.value.toLowerCase();
        this.props.callback(this.props.items.map(f => f.toLowerCase().includes(searchTerm)));
    };

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    onChange={this.handleChange}
                    autoFocus
                    placeholder={"Search by " + this.props.fieldName + ": "}
                />
            </div>
        );
    }
}
