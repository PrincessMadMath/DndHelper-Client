import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { playerType } from '../../type'
import Player from './Player'
import PlayerForm from './PlayerForm'

class EditablePlayer extends Component {
  static propTypes = {
    player: playerType.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  state = {
    isEditing: this.props.player.name === ''
  };

  handleUpdate = player => {
    this.props.onUpdate(player)
    this.setState({ isEditing: false })
  };

  handleDelete = () => {
    this.props.onDelete(this.props.player.id)
  };

  handleFormClose = () => {
    this.setState({ isEditing: false })
  };

  render () {
    if (this.state.isEditing) {
      return (
        <PlayerForm
          player={this.props.player}
          onFormSubmit={this.handleUpdate}
          onFormClose={this.handleFormClose}
        />
      )
    } else {
      return (
        <Player
          player={this.props.player}
          onEdit={() => this.setState({ isEditing: true })}
          onDelete={this.handleDelete}
        />
      )
    }
  }
}

export default EditablePlayer
