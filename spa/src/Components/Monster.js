import React from "react";
import { Link } from "react-router-dom";

import Abilities from "./SubComponents/Abilities";
import SpecialAbilities from "./SubComponents/SpecialAbilities";
import Actions from "./SubComponents/Actions";
import FightInfo from "./SubComponents/FightInfo";
import OtherInfo from "./SubComponents/OtherInfo";
import SpellCasting from "./SubComponents/SpellCasting";
import ManualComponent from "./StyledComponent/ManualComponent";

class Monster extends React.Component {
    render() {
        const { monster, spells } = this.props;

        return (
            <ManualComponent>
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
                {this.props.children}
            </ManualComponent>
        );
    }
}
export default Monster;
