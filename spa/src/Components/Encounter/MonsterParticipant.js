import React, { Component } from "react";
import PropTypes from "prop-types";
import DndContainer from "../StyledComponent/DndContainer";

export default class MonsterParticipant extends Component {
    static propTypes = {
        participant: PropTypes.shape({
            name: PropTypes.string.isRequired,
            initiative: PropTypes.number.isRequired,
            hp: PropTypes.number.isRequired,
            info: PropTypes.object.isRequired,
        }),
        onMonsterClick: PropTypes.func.isRequired,
        onUpdateMonsterLife: PropTypes.func.isRequired,
        onKillMonster: PropTypes.func.isRequired,
    };

    onLifeUpdate = event => {
        this.props.onUpdateMonsterLife(event.target.value);
    };

    onKillMonster = event => {
        this.props.onKillMonster();
        event.stopPropagation();
    };

    preventPropagation = event => {
        event.stopPropagation();
    };

    render() {
        const { name, initiative, hp, info } = this.props.participant;

        return (
            <DndContainer key={name} onClick={this.props.onMonsterClick}>
                <div className="flex flex-row">
                    <div className="flex flex-column">
                        <div>
                            {name} Initiative(
                            {initiative})
                        </div>
                        <div>Race: {info.name}</div>
                    </div>
                    <div>
                        <div className="flex flex-column ml3">
                            <div>AC: {info.armorClass}</div>
                            <div>
                                <span>HP: </span>
                                <input
                                    className="w3"
                                    type="number"
                                    value={hp}
                                    onChange={this.onLifeUpdate}
                                    onClick={this.preventPropagation}
                                />
                            </div>
                            <button onClick={this.onKillMonster}>KILL IT!</button>
                        </div>
                    </div>
                </div>
            </DndContainer>
        );
    }
}
