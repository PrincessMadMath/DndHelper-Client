import React from "react";
import PropTypes from "prop-types";
import { Spell } from "./Spell";
import { SmartScroll } from "./Utils/SmartScroll";

const propTypes = {
    visibleSpells: PropTypes.array.isRequired,
};

export const SpellList = ({ visibleSpells }) => {
    const renderSpellItem = spell => {
        return <Spell key={spell.name} spell={spell} opened={visibleSpells.length === 1} />;
    };

    return (
        <div>
            <SmartScroll items={visibleSpells} renderItem={renderSpellItem} />
        </div>
    );
};

SpellList.propTypes = propTypes;
