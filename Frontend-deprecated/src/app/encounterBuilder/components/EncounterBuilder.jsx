import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { encounterType } from '../type'

import EncounterMetaForm from './EncounterMetaForm'
import MonsterSelector from './MonsterSelector'

class EncounterBuilder extends Component {
  state = {
    name: this.props.encounter.name,
    description: this.props.encounter.description,
    monsters: this.props.encounter.monsters
  };

  static propTypes = {
    encounter: encounterType,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  handleOnComplete = () => {
    const encounter = {
      id: this.props.encounter.id,
      name: this.state.name,
      description: this.state.description,
      monsters: this.state.monsters
    }
    this.props.onComplete(encounter)
  };

  handleOnCancel = () => {
    this.props.onCancel()
  };

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  };

  handleUpdateName = name => {
    this.setState({
      name: name
    })
  };

  handleUpdateDescription = description => {
    this.setState({ description: description })
  };

  handleAddMonster = monster => {
    const existingMonster = this.state.monsters.find(
      x => x.monsterId === monster.id
    )
    if (existingMonster) {
      this.handleUpdateMonsterCount(
        existingMonster.monsterId,
        existingMonster.count + 1
      )
    } else {
      this.setState({
        monsters: [...this.state.monsters, { monsterId: monster.id, count: 1 }]
      })
    }
  };

  handleUpdateMonsterCount = (id, count) => {
    const updatedMonsters = this.state.monsters.map(x => {
      if (x.monsterId === id) {
        return { ...x, count: count }
      } else {
        return x
      }
    })

    this.setState({
      monsters: updatedMonsters
    })
  };

  handleDeleteMonster = id => {
    const updatedMonsters = this.state.monsters.filter(x => x.monsterId !== id)

    this.setState({ monsters: updatedMonsters })
  };

  render () {
    return (
      <div>
        <h3>Encounter builder</h3>
        <div>
          <EncounterMetaForm
            name={this.state.name}
            description={this.state.description}
            onInputChange={this.onInputChange}
          />
          <MonsterSelector
            selectedMonsters={this.state.monsters}
            onAdd={this.handleAddMonster}
            onCountUpdate={this.handleUpdateMonsterCount}
            onDelete={this.handleDeleteMonster}
          />
        </div>
        <div>
          <button onClick={this.handleOnComplete}>Complete</button>
          <button onClick={this.handleOnCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default EncounterBuilder
