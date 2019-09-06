import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Abilities from "./SubComponents/Abilities";
import SpecialAbilities from "./SubComponents/SpecialAbilities";
import Actions from "./SubComponents/Actions";
import FightInfo from "./SubComponents/FightInfo";
import OtherInfo from "./SubComponents/OtherInfo";
import SpellCasting from "./SubComponents/SpellCasting";
import { DndContainer } from "./StyledComponent/DndContainer";
import styled from "styled-components";

import PropTypes from "prop-types";
import LairActions from "./SubComponents/LairActions";
import Sources from "./SubComponents/Sources";

const propTypes = {
    monster: PropTypes.object.isRequired,
    opened: PropTypes.bool.isRequired,
};

export const Monster = ({ monster, opened, children }) => {
    const [isOpened, setIsOpened] = useState(opened);

    useEffect(() => {
        setIsOpened(opened);
    }, [opened]);

    const monsterClick = () => {
        setIsOpened(isOpened => !isOpened);
        // Todo: add timeout to force check lazy loaded when collapsing spells
    };

    return (
        <DndContainer animated={!isOpened}>
            <div onClick={monsterClick} className="pointer">
                <MonsterLink as={Link} to={`/monsters/${monster.name}?$list=Aarakocra,Aarakocra`}>
                    {monster.name}
                </MonsterLink>
            </div>
            {isOpened && (
                <MonsterInfo isOpened={isOpened}>
                    <FightInfo monster={monster} />
                    <Abilities abilities={monster.abilities} />
                    <OtherInfo monster={monster} />
                    <SpecialAbilities title="Features" specialAbilities={monster.features} />
                    <SpellCasting title={"Spell Casting"} monsterSpells={monster.spellcasting} />
                    <SpellCasting
                        title={"Innate Spell Casting"}
                        monsterSpells={monster.innateSpellcasting}
                    />
                    <Actions actions={monster.actions} />
                    <SpecialAbilities
                        title="Legendary Actions"
                        specialAbilities={monster.legendaryActions}
                    />
                    <LairActions lairActions={monster.lairActions} />
                    <Sources sources={monster.sources}></Sources>
                </MonsterInfo>
            )}
            {children}
        </DndContainer>
    );
};

Monster.propTypes = propTypes;

const MonsterLink = styled.div.attrs({
    className: "no-underline f2",
})``;

const MonsterInfo = styled.div`
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
`;
