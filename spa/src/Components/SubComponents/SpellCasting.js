/* Utils */
import React from "react";
import PropTypes from "prop-types";

import SpellModal from "./SpellModal";

const SpellCasting = ({ monsterSpells, spellsDatabase }) => {
    if (monsterSpells == null) {
        return <div />;
    }

    return (
        <div>
            <h2 className="monster-section-name">Spell Casting</h2>
            <hr />
            <p>{monsterSpells.desc}</p>
            {monsterSpells.details.map(x => (
                <SpellDetail key={x.details} spellsByLevel={x} spellsDatabase={spellsDatabase} />
            ))}
        </div>
    );
};

const SpellDetail = ({ spellsByLevel, spellsDatabase }) => {
    return (
        <div>
            <strong>{spellsByLevel.details}: </strong>
            {spellsByLevel.spells.map((x, index) => (
                <SpellItem
                    key={x}
                    spellName={x}
                    isLastOne={index === spellsByLevel.spells.length - 1}
                    spellsDatabase={spellsDatabase}
                />
            ))}
        </div>
    );
};

const SpellItem = ({ spellName, isLastOne, spellsDatabase }) => {
    return (
        <span>
            <SpellModal name={spellName} spellsDatabase={spellsDatabase} />
            {isLastOne ? "" : ", "}
        </span>
    );
};

SpellCasting.propType = {
    monsterSpells: PropTypes.shape({
        desc: PropTypes.string.isRequired,
        details: PropTypes.array.isRequired,
    }).isRequired,
    spellsDatabase: PropTypes.shape({
        desc: PropTypes.string.isRequired,
        details: PropTypes.array.isRequired,
    }).isRequired,
};

SpellDetail.propType = {
    details: PropTypes.string.isRequired,
    spells: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SpellCasting;
