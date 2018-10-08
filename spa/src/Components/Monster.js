import React from "react";
import { Link } from "react-router-dom";

import Abilities from "./SubComponents/Abilities";
import SpecialAbilities from "./SubComponents/SpecialAbilities";
import Actions from "./SubComponents/Actions";
import FightInfo from "./SubComponents/FightInfo";
import OtherInfo from "./SubComponents/OtherInfo";
import SpellCasting from "./SubComponents/SpellCasting";

import styled from "styled-components";

const MonsterComponent = styled.div`
    border-style: solid;
    border-color: #8e2f1a;
    border-width: 6px 3px;
    padding: 1em;
    margin: 1em;
    max-width: 45em;
    background-color: #eee5ce;
    background-image: url("./img/background.jpg");
    box-shadow: 10px 10px 5px #888888;
`;

class Monster extends React.Component {
    render() {
        const { monster, spells } = this.props;

        return (
            <MonsterComponent>
                <Link
                    to={`/monsters/${monster.name}?$list=Aarakocra,Aarakocra`}
                    className="monster-name-link"
                >
                    <h1 className="monster-name">{monster.name}</h1>
                </Link>
                <FightInfo monster={monster} />
                <Abilities abilities={monster.abilities} />
                <OtherInfo monster={monster} />
                <SpecialAbilities title="Features" specialAbilities={monster.features} />
                <SpellCasting monsterSpells={monster.spellCasting} spellsDatabase={spells} />
                <Actions actions={monster.actions} />
                <SpecialAbilities
                    title="Legendary Actions"
                    specialAbilities={monster.legendaryActions}
                />
            </MonsterComponent>
        );
    }
}
export default Monster;
