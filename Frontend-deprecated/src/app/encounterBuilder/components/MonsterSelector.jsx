/* Utils */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'

import { encounterMonsterType } from '../type'
import monstersModule from './../../monsters'

class MonsterSelector extends Component {
  static propTypes = {
    selectedMonsters: PropTypes.arrayOf(encounterMonsterType).isRequired,
    onAdd: PropTypes.func.isRequired,
    onCountUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  state = {
    selectedMonsters: []
  };

  handleMonsterSelection = ({ value }) => {
    const selectedMonster = { id: value }
    this.props.onAdd(selectedMonster)
  };

  renderMonsters = currentMonster => {
    const deleteMonster = () => {
      this.props.onDelete(currentMonster.monsterId)
    }

    const onCountChange = e => {
      this.props.onCountUpdate(
        currentMonster.monsterId,
        parseInt(e.target.value, 10)
      )
    }

    return (
      <div key={currentMonster.monsterId}>
        <p>
          {currentMonster.monsterId} x
          <input
            type='number'
            min={0}
            value={currentMonster.count}
            onChange={onCountChange}
          />
        </p>
        <button onClick={deleteMonster}>Delete</button>
      </div>
    )
  };

  render () {
    return (
      <div>
        <h3>Select your monsters...</h3>
        <Select
          options={transformMonster(this.props.monsters)}
          onChange={this.handleMonsterSelection}
        />
        <div>
          {this.props.selectedMonsters.map(this.renderMonsters)}
        </div>
      </div>
    )
  }
}

function transformMonster (monsters) {
  return monsters.map(monster => {
    return {
      value: monster.name,
      label: monster.name
    }
  })
}

const mapStateToProps = state => {
  return { monsters: state[monstersModule.constants.NAME] }
}

export default connect(mapStateToProps)(MonsterSelector)
