/* Utils */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { partyType } from '../../type'

import './Style/Party.css'

class Party extends Component {
  static propTypes = {
    party: partyType.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render () {
    const { party } = this.props
    return (
      <div className='party-box'>
        <h3>
          {party.name}
        </h3>
        <div>
          <ul>
            {party.players.map(player =>
              <li key={player.id}>
                {player.name}
              </li>
            )}
          </ul>
        </div>
        <div>
          <button onClick={() => this.props.onEdit()}>Edit</button>
          <button onClick={() => this.props.onDelete(party.id)}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Party
