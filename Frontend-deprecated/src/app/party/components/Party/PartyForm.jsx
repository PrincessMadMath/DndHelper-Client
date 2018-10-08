/* Utils */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uuidv4 from 'uuid/v4'

import { partyType } from '../../type'
import PartyMetaForm from './PartyMetaForm'
import EditablePlayerList from '../Player/EditablePlayerList'

import './Style/Party.css'

class PartyForm extends Component {
  static propTypes = {
    party: partyType.isRequired
  };

  state = {
    name: this.props.party.name,
    players: this.props.party.players,
    onCompleteParty: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  handleMetaChange = meta => {
    this.setState({ name: meta.name })
  };

  handleAddPlayer = () => {
    const newPlayer = generatePlayer()
    this.setState({
      players: this.state.players.concat(newPlayer)
    })
  };

  handlePlayerUpdate = updatedPlayer => {
    this.updatePlayer(updatedPlayer)
  };

  updatePlayer = updatedPlayer => {
    this.setState({
      players: this.state.players.map(player => {
        if (updatedPlayer.id === player.id) {
          return updatedPlayer
        } else {
          return player
        }
      })
    })
  };

  handleDeletePlayer = id => {
    this.setState({
      players: this.state.players.filter(player => player.id !== id)
    })
  };

  handleCompleteParty = () => {
    const party = this.state
    this.props.onCompleteParty({
      id: this.props.party.id,
      name: party.name,
      players: party.players
    })
  };

  handleCancel = () => {
    this.props.onCancel()
  };

  render () {
    return (
      <div className='party-box'>
        <PartyMetaForm
          name={this.state.name}
          onMetaChange={this.handleMetaChange}
        />
        <EditablePlayerList
          players={this.state.players}
          onPlayerUpdate={this.handlePlayerUpdate}
          onPlayerDelete={this.handleDeletePlayer}
        />
        <div>
          <button onClick={this.handleAddPlayer}>Add Player</button>
        </div>
        <div>
          {' '}<button onClick={this.handleCompleteParty}>
            Complete party
          </button>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

function generatePlayer () {
  return { id: uuidv4(), name: '' }
}

export default PartyForm
