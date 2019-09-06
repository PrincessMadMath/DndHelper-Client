import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    monsters: PropTypes.object.isRequired,
    onAddMonster: PropTypes.func.isRequired,
    onRemoveMonster: PropTypes.func.isRequired,
    onGoToEncounter: PropTypes.func.isRequired,
};

export const MonsterSelector = ({ monsters, onAddMonster, onRemoveMonster, onGoToEncounter }) => {
    const getMonsterList = () => {
        const items = [];

        for (var key in monsters) {
            items.push({
                monster: key,
                count: monsters[key],
            });
        }

        return items;
    };

    const monstersList = getMonsterList();

    return (
        <div className="fixed right-1 ba w5">
            <div className="flex flex-row justify-center align-center underline">
                Monster Selections
            </div>
            <div className="mv1">
                {monstersList.map(x => (
                    <div key={x.monster} className="flex flex-row justify-between ma1">
                        <button onClick={() => onRemoveMonster(x.monster)}>-</button>
                        <span className="mh1">
                            {x.monster} x {x.count}
                        </span>
                        <button onClick={() => onAddMonster(x.monster)}>+</button>
                    </div>
                ))}
            </div>
            <button onClick={onGoToEncounter}>Go to encounter</button>
        </div>
    );
};

MonsterSelector.propTypes = propTypes;
