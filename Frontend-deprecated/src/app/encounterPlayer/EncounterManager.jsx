/* Utils */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TurnManager, MonsterSelector, PartiesSelector } from './components'

// Store actions
import monsterModule from '../monsters'
import partyModule from '../party'

class EncounterManager extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monsters: [],
      players: []
    }
  }

  onStart = () => {
    console.log('On click!')
    this.setState({
      monsters: this._monsterSelector.getSelectedMonsters(),
      players: this._playerSelector.getSelectedPlayers()
    })
  };

  render () {
    const { all_monsters } = this.props
    const { monsters, players } = this.state
    const orders = shuffle(monsters, players)
    return (
      <div>
        <h1>Encounter player</h1>
        <MonsterSelector
          all_monsters={all_monsters}
          ref={c => (this._monsterSelector = c)}
        />
        <PartiesSelector ref={c => (this._playerSelector = c)} parties={this.props.parties.groups} />
        <button onClick={this.onStart}>Start the encounter!</button>
        <TurnManager orders={orders} />
      </div>
    )
  }
}

function shuffle (monsters, players) {
  monsters = monsters.map(monster => {
    const initiative = Math.ceil(Math.random() * 20)
    return { ...monster, initiative }
  })

  const order = [...monsters, ...players]
  order.sort((a, b) => b.initiative - a.initiative)

  return order
}

const mapStateToProps = state => {
  return {
    all_monsters: state[monsterModule.constants.NAME],
    parties: state[partyModule.store.NAME]
  }
}

const Manager = connect(mapStateToProps)(EncounterManager)

export default Manager
