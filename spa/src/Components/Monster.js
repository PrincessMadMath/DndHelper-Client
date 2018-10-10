import React from "react";
import { Link } from "react-router-dom";

import Abilities from "./SubComponents/Abilities";
import SpecialAbilities from "./SubComponents/SpecialAbilities";
import Actions from "./SubComponents/Actions";
import FightInfo from "./SubComponents/FightInfo";
import OtherInfo from "./SubComponents/OtherInfo";
import SpellCasting from "./SubComponents/SpellCasting";
import DndStyledContainer from "./StyledComponent/DndStyledContainer";
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

        return (
            <DndStyledContainer>
                <div onClick={this.monsterClick}>
                    <MonsterLink
                        as={Link}
                        to={`/monsters/${monster.name}?$list=Aarakocra,Aarakocra`}
                    >
                        {monster.name}
                    </MonsterLink>
                </div>
                <MonsterInfo isOpened={this.state.isOpened}>
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
            </DndStyledContainer>
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
