import React from "react";
import PropTypes from "prop-types";
import { Monster } from "./Monster";

const propTypes = {
    monstersDB: PropTypes.array.isRequired,
};

export const MonsterSingle = ({ monstersDB, match }) => {
    const monsterId = match.params.monsterId;

    const monster = monstersDB.find(x => x.name === monsterId);

    return (
        <div>
            <Monster monster={monster} opened />
        </div>
    );
};

MonsterSingle.propTypes = propTypes;
