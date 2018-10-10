import React from "react";
import { Link } from "react-router-dom";

import Abilities from "./SubComponents/Abilities";
import SpecialAbilities from "./SubComponents/SpecialAbilities";
import Actions from "./SubComponents/Actions";
import FightInfo from "./SubComponents/FightInfo";
import OtherInfo from "./SubComponents/OtherInfo";
import SpellCasting from "./SubComponents/SpellCasting";
import DndContainer from "./StyledComponent/DndContainer";
import styled from "styled-components";

class Monster extends React.Component {
    state = {
        isOpened: false,
    };

    monsterClick = () => {
        this.setState(state => ({ isOpened: !state.isOpened }));
    };

    render() {
        const { monster, spells } = this.props;
        const { isOpened } = this.state;

        return (
            <DndContainer animated={!isOpened}>
                <div onClick={this.monsterClick} className="pointer">
                    <MonsterLink
                        as={Link}
                        to={`/monsters/${monster.name}?$list=Aarakocra,Aarakocra`}
                    >
                        {monster.name}
                    </MonsterLink>
                </div>
                <MonsterInfo isOpened={isOpened}>
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
                </MonsterInfo>
                {this.props.children}
            </DndContainer>
        );
    }
}

const MonsterLink = styled.div.attrs({
    className: "no-underline f2",
})``;

const MonsterInfo = styled.div`
    max-height: ${props => (props.isOpened ? "2000px" : "0")};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
`;

export default Monster;
