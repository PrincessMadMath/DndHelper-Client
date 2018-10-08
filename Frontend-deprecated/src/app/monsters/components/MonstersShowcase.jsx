import React, { Component } from "react";

import MonsterQuickInfo from "./MonsterQuickInfo";
import MonsterInfo from "./MonsterInfo";

import "./style/Monster.css";

class MonstersShowcase extends Component {
  state = {
    textForm: "",
    selectedMonster: null,
  };

  renderTextEntry = () => {
    const onTextChange = event => {
      const text = event.target.value;
      this.setState({ textForm: text });
    };

    return (
      <div>
        <label>
          Monsters:
          <input
            type="text"
            name="name"
            value={this.state.textForm}
            onChange={onTextChange}
          />
        </label>
      </div>
    );
  };

  getMonsters = (text, database) => {
    const monsterName = text.split(",");
    const monstersInfo = [];

    monsterName.foreach(name => {
      const monsterInfo = database.find(
        x => x.name.toLowerCase().trim() === name.toLowerCase().trim()
      );

      if (monsterInfo) {
        monstersInfo.push(monsterInfo);
      }
    });

    return monstersInfo;
  };

  renderMonsters = monsters => {
    const onClick = monster => {
      this.setState({ selectedMonster: monster });
    };

    return (
      <div>
        {monsters.map(function(value) {
          return (
            <div onClick={() => onClick(value)}>
              <MonsterQuickInfo monster={value} />
            </div>
          );
        })}
      </div>
    );
  };

  renderSelecterMonster = monster => {
    if (monster) {
      return <MonsterInfo monsterToRender={monster} />;
    }
    return <div />;
  };

  render() {
    const monsterDatabase = this.props.monsters;
    const monsters = this.getMonsters(this.state.textForm, monsterDatabase);
    const selectedMonster =
      monsters.length > 0 ? this.state.selectedMonster : null;
    return (
      <div className="monster-overview__container ">
        <div>
          {this.renderTextEntry()}
          {this.renderMonsters(monsters)}
        </div>
        <div>{this.renderSelecterMonster(selectedMonster)}</div>
      </div>
    );
  }
}

export default MonstersShowcase;
