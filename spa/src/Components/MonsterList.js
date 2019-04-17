import React, { Component } from "react";
import PropTypes from "prop-types";
import Monster from "./Monster";
import SmartScroll from "./Utils/SmartScroll";

import styled from "styled-components";

const AddButton = styled.div`
    position: absolute;
    right: 20px;
    top: 10px;
`;

const HideOnSmall = styled.div`
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;
export default class MonsterList extends Component {
    static propTypes = {
        visibleMonsters: PropTypes.array.isRequired,
    };

    renderMonsterItem = monster => {
        const { visibleMonsters, onAddMonster } = this.props;

        return (
            <Monster monster={monster} opened={visibleMonsters.length === 1}>
                <HideOnSmall>
                    <AddButton>
                        <button onClick={() => onAddMonster(monster.name)}>+</button>
                    </AddButton>
                </HideOnSmall>
            </Monster>
        );
    };

    render() {
        const { visibleMonsters } = this.props;

        return (
            <div>
                <SmartScroll items={visibleMonsters} renderItem={this.renderMonsterItem} />
            </div>
        );
    }
}
