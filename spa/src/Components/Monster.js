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
    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.opened,
        };
    }

    monsterClick = () => {
        this.setState(state => ({ isOpened: !state.isOpened }));
        // Todo: add timeout to force check lazy loaded when collapsing spells
    };

    componentWillReceiveProps(nextProps) {
        const { opened } = nextProps;

        this.setState({
            isOpened: opened,
        });
    }

    render() {
        const { monster } = this.props;
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
                {isOpened && (
                    <MonsterInfo isOpened={isOpened}>
                        <FightInfo monster={monster} />
                        <Abilities abilities={monster.abilities} />
                        <OtherInfo monster={monster} />
                        <SpecialAbilities title="Features" specialAbilities={monster.features} />
                        <SpellCasting monsterSpells={monster.spellCasting} />
                        <Actions actions={monster.actions} />
                        <SpecialAbilities
                            title="Legendary Actions"
                            specialAbilities={monster.legendaryActions}
                        />
                    </MonsterInfo>
                )}
                {this.props.children}
            </DndContainer>
        );
    }
}

const MonsterLink = styled.div.attrs({
    className: "no-underline f2",
})``;

const MonsterInfo = styled.div`
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
`;

export default Monster;
