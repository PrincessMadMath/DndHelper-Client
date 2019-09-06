import React from "react";
import PropTypes from "prop-types";
import { DndContainer } from "../StyledComponent/DndContainer";

const propTypes = {
    participant: PropTypes.shape({
        name: PropTypes.string.isRequired,
        initiative: PropTypes.number.isRequired,
    }),
    onPlayerClick: PropTypes.func.isRequired,
};

export const PlayerParticipant = ({ participant, onPlayerClicks }) => {
    const { name, initiative } = participant;

    return (
        <DndContainer onClick={onPlayerClicks}>
            <div className="flex flex-row">
                <div className="flex flex-column">
                    <div>
                        {name} Initiative(
                        {initiative})
                    </div>
                    <div>Player</div>
                </div>
            </div>
        </DndContainer>
    );
};

PlayerParticipant.propTypes = propTypes;
