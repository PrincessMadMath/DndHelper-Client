/* Utils */
import React, { Component } from 'react'

import { playerType } from '../../type'

class PlayerForm extends Component {
  static propTypes = {
    player: playerType
  };

  state = {
    name: this.props.player.name
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.player.id,
      name: this.state.name
    })
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  };

  render () {
    return (
      <div>
        <label>
          Player name:
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>

        <button onClick={this.handleSubmit}>Update</button>
        <button onClick={this.props.onFormClose}>Cancel</button>
      </div>
    )
  }
}

export default PlayerForm
