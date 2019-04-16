import React, { Component } from "react";
import PropTypes from "prop-types";

export default class MonsterSelector extends Component {
    static propTypes = {
        monsters: PropTypes.object.isRequired,
        onAddMonster: PropTypes.func.isRequired,
        onRemoveMonster: PropTypes.func.isRequired,
        onGoToEncounter: PropTypes.func.isRequired,
    };

    getMonsterList = () => {
        const { monsters } = this.props;

        const items = [];

        for (var key in monsters) {
            items.push({
                monster: key,
                count: monsters[key],
            });
        }

        return items;
    };

    render() {
        const monstersList = this.getMonsterList();

        return (
            <div className="fixed right-1 ba w5">
                <div className="flex flex-row justify-center align-center underline">
                    Monster Selections
                </div>
                <div className="mv1">
                    {monstersList.map(x => (
                        <div key={x.monster} className="flex flex-row justify-between ma1">
                            <button onClick={() => this.props.onRemoveMonster(x.monster)}>-</button>
                            <span className="mh1">
                                {x.monster} x {x.count}
                            </span>
                            <button onClick={() => this.props.onAddMonster(x.monster)}>+</button>
                        </div>
                    ))}
                </div>
                <button onClick={this.props.onGoToEncounter}>Go to encounter</button>
            </div>
        );
    }
}
