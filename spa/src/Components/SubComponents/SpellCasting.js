/* Utils */
import React from "react";

import { SpellModal } from "./SpellModal";

const SpellCasting = ({ title, monsterSpells }) => {
    if (monsterSpells == null) {
        return <div />;
    }

    return (
        <div>
            <h2 className="mb0">{title}</h2>
            <hr />
            <p>{monsterSpells.desc}</p>
            {monsterSpells.details.map(x => (
                <SpellDetail key={x.details} spellsByLevel={x} />
            ))}
        </div>
    );
};

const SpellDetail = ({ spellsByLevel }) => {
    return (
        <div>
            <strong>{spellsByLevel.details}: </strong>
            {spellsByLevel.spells.map((spellName, index) => (
                <span key={spellName}>
                    <SpellModal name={spellName} />
                    {index === spellsByLevel.spells.length - 1 ? "" : ", "}
                </span>
            ))}
        </div>
    );
};

export default SpellCasting;
