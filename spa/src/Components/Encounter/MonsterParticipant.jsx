import React from "react";
import PropTypes from "prop-types";
import { DndContainer } from "../StyledComponent/DndContainer";
import { evaluate } from "mathjs";

const propTypes = {
    participant: PropTypes.shape({
        name: PropTypes.string.isRequired,
        initiative: PropTypes.number.isRequired,
        hp: PropTypes.number.isRequired,
        info: PropTypes.object.isRequired,
    }),
    onMonsterClick: PropTypes.func.isRequired,
    onUpdateMonsterLife: PropTypes.func.isRequired,
    onKillMonster: PropTypes.func.isRequired,
};

export const MonsterParticipant = ({
    participant,
    onMonsterClick,
    onUpdateMonsterLife,
    onKillMonster,
}) => {
    const onLifeUpdate = event => {
        onUpdateMonsterLife(event.target.value);
    };

    const handleKillMonster = event => {
        onKillMonster();
        event.stopPropagation();
    };

    const preventPropagation = event => {
        event.stopPropagation();
    };

    const onLifeKeyPressed = event => {
        if (event.key === "Enter") {
            onLifeUpdate(event);
            try {
                const newLife = evaluate(event.target.value);
                onUpdateMonsterLife(newLife);
            } catch (error) {}
        }
    };

    const { name, initiative, hp, info } = participant;

    return (
        <DndContainer key={name} onClick={onMonsterClick}>
            <div className="flex flex-row">
                <div className="flex flex-column">
                    <div>
                        {name} Initiative(
                        {initiative})
                    </div>
                    <div>Race: {info.name}</div>
                </div>
                <div>
                    <div className="flex flex-column ml3">
                        <div>AC: {info.armorClass}</div>
                        <div>
                            <span>HP: </span>
                            <input
                                className="w3"
                                type="text"
                                value={hp}
                                onKeyPress={onLifeKeyPressed}
                                onChange={onLifeUpdate}
                                onClick={preventPropagation}
                            />
                        </div>
                        <button onClick={handleKillMonster}>KILL IT!</button>
                    </div>
                </div>
            </div>
        </DndContainer>
    );
};

MonsterParticipant.propTypes = propTypes;
