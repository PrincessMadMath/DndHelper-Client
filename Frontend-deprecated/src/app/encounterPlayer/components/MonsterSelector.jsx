/* Utils */
import React, { Component } from 'react'
import Select from 'react-select'

class MonsterSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedMonsters: [],
      monstersToSelect: transformMonster(props.all_monsters)
    }
  }

  onMonsterSelected = monsterValue => {
    this.setState({
      selectedMonsters: [
        ...this.state.selectedMonsters,
        { ...monsterValue, id: Math.floor(Math.random() * 9999999999) }
      ]
    })
  };

  getSelectedMonsters = () => {
    return this.state.selectedMonsters.map(x => {
      return {
        name: x.value
      }
    })
  };

  renderMonsters = currentMonster => {
    const deleteMonster = () => {
      this.setState({
        selectedMonsters: this.state.selectedMonsters.filter(
          monster => monster.id !== currentMonster.id
        )
      })
    }

    return (
      <div key={currentMonster.id}>
        <p>
          {currentMonster.label}
        </p>

        <button onClick={deleteMonster}>Delete</button>
      </div>
    )
  };

  render () {
    const { monstersToSelect, selectedMonsters } = this.state

    return (
      <div>
        <h3>Select your monsters...</h3>
        <Select options={monstersToSelect} onChange={this.onMonsterSelected} />
        <div>
          {selectedMonsters.map(this.renderMonsters)}
        </div>
      </div>
    )
  }
}

function transformMonster (monsters) {
  const selectableMonsters = monsters.map(monster => {
    return {
      value: monster.name,
      label: monster.name
    }
  })

  return selectableMonsters
}

export default MonsterSelector
