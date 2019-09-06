import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { DBContext } from "../App";

const propTypes = {
    onAddMonster: PropTypes.func.isRequired,
};

export const MonsterAdder = ({ onAddMonster }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const getMonsterOption = monstersDB => {
        return monstersDB.map(x => ({
            label: x.name,
            value: x.name,
            info: x,
        }));
    };

    const handleAddMonster = () => {
        const { info: monsterInfo } = selectedOption;
        if (!monsterInfo) {
            return;
        }

        onAddMonster(monsterInfo);
        setSelectedOption(null);
    };

    return (
        <div>
            <DBContext.Consumer>
                {value => (
                    <Select
                        value={selectedOption}
                        onChange={selectedOption => setSelectedOption(selectedOption)}
                        options={getMonsterOption(value.monstersDB)}
                    />
                )}
            </DBContext.Consumer>

            <button onClick={handleAddMonster}>Add monster</button>
        </div>
    );
};

MonsterAdder.propTypes = propTypes;
