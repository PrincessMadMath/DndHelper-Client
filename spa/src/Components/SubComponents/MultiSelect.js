/* Utils */
import React from "react";
import Select from "react-select";
import Filter from "../StyledComponent/Filter";
import PropTypes from "prop-types";

const propTypes = {
    fieldName: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    compareFunc: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
};

export const MultiSelect = ({ items, fieldName, compareFunc, callback }) => {
    let uniqueOptions = new Set(items.flat().map(v => v.trim().toLowerCase()));
    let options;
    if (compareFunc) {
        options = [...uniqueOptions].sort(compareFunc);
    } else {
        options = [...uniqueOptions].sort();
    }

    const handleChange = selectedOptions => {
        let selectedValues = (selectedOptions === null ? [] : selectedOptions).map(o => o.value);

        if (selectedValues.length === 0) {
            callback(new Array(this.props.items.length).fill(true));
        } else {
            callback(
                // Todo[kfedorov]: Maybe refactor this so its more readable
                // This handles both the cases where the prop.sitems are of the shape [string, string, ...] ex. Spell range
                // or [[string, string], [string], ...] ex. Spell caster class
                items.map(f =>
                    [f]
                        .flat()
                        .some(f_flat =>
                            selectedValues.some(sO => f_flat.trim().toLowerCase() === sO)
                        )
                )
            );
        }
    };

    return (
        <Filter>
            <Select
                className="w5"
                options={options.map(o => ({ value: o, label: o }))}
                onChange={handleChange}
                isMulti={true}
                placeholder={" - Filter by " + fieldName + " - "}
            />
        </Filter>
    );
};

MultiSelect.propTypes = propTypes;
