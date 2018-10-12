/* Utils */
import React from "react";
import PropTypes from "prop-types";
import Filter from "../StyledComponent/Filter";
import { throttle } from "throttle-debounce";
import WordMatch from "../../utils/WordSearch";

export default class SearchBox extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        fieldName: PropTypes.string.isRequired,
    };

    callback = throttle(250, term => {
        this.props.callback(this.props.items.map(f => WordMatch(term, f)));
    });

    handleChange = event => {
        this.callback(event.target.value.toLowerCase());
    };

    render() {
        return (
            <Filter className="css-vj8t7z">
                <input
                    className="css-1hwfws3 bw0 bg-transparent h-100"
                    type="text"
                    onChange={this.handleChange}
                    autoFocus
                    placeholder={"Search by " + this.props.fieldName + ": "}
                />
            </Filter>
        );
    }
}
