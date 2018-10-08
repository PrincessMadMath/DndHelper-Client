/* Utils */
import React from "react";
import PropTypes from "prop-types";

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.props.callback(this.props.items.map(f => f.toLowerCase().includes(searchTerm)));
    }

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

SearchBox.propType = {
    items: PropTypes.arrayOf(PropTypes.string.required),
    fieldName: PropTypes.string.required,
};
