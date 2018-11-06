import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { DBContext } from "../App";

export default class MonsterAdder extends Component {
    static propTypes = {
        onAddMonster: PropTypes.func.isRequired,
    };

    state = {
        selectedOption: null,
    };

    getMonsterOption = monstersDB => {
        return monstersDB.map(x => ({
            label: x.name,
            value: x.name,
            info: x,
        }));
    };

    onAddMonster = () => {
        const { info: monsterInfo } = this.state.selectedOption;
        if (!monsterInfo) {
            return;
        }

        this.props.onAddMonster(monsterInfo);
        this.setState({
            selectedOption: null,
        });
    };

    render() {
        return (
            <div>
                <DBContext.Consumer>
                    {value => (
                        <Select
                            value={this.state.selectedOption}
                            onChange={selectedOption => this.setState({ selectedOption })}
                            options={this.getMonsterOption(value.monstersDB)}
                        />
                    )}
                </DBContext.Consumer>

                <button onClick={this.onAddMonster}>Add monster</button>
            </div>
        );
    }
}
