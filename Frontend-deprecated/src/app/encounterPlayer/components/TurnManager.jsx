/* Utils */
import React, { Component } from 'react'

class TurnManager extends Component {
  renderParticipant = info => {
    return (
      <div>
        <h4>
          {info.name}
        </h4>
        <p>
          {info.initiative}
        </p>
      </div>
    )
  };

  render () {
    return (
      <div>
        <h2>Turn Manager</h2>
        {this.props.orders.map(this.renderParticipant)}
      </div>
    )
  }
}

export default TurnManager
