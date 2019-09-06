import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    onUpPosition: PropTypes.func.isRequired,
    onDownPosition: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export const Participant = ({ onUpPosition, onDownPosition, children }) => {
    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-column">
                <button onClick={onUpPosition}>
                    <span role="img" aria-label="up-arrow">
                        ⬆️
                    </span>
                </button>
                <button onClick={onDownPosition}>
                    <span role="img" aria-label="down-arrow">
                        ⬇️
                    </span>
                </button>
            </div>
            {children}
        </div>
    );
};

Participant.propTypes = propTypes;
