/* Utils */
import React from "react";
import PropTypes from "prop-types";
import Filter from "../StyledComponent/Filter";
import { throttle } from "throttle-debounce";
import WordMatch from "../../utils/WordSearch";

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fieldName: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    callback: PropTypes.func.isRequired,
};

export const SearchBox = ({ items, fieldName, initialValue, callback }) => {
    const callback2 = throttle(250, term => {
        callback(items.map(f => WordMatch(term, f)));
        // Todo: find a better place for this eventually
        window.history.replaceState(null, null, "?q=" + term);
    });

    if (initialValue) {
        callback2(initialValue);
    }

    const handleChange = event => {
        callback2(event.target.value.toLowerCase());
    };

    return (
        <Filter className="css-vj8t7z">
            <input
                className="css-1hwfws3 bw0 bg-transparent h-100"
                type="text"
                defaultValue={initialValue}
                onChange={handleChange}
                autoFocus
                placeholder={"Search by " + fieldName + ": "}
            />
        </Filter>
    );
};

SearchBox.propTypes = propTypes;
