/* Utils */
import React, { Component } from 'react'

class PartiesSelector extends Component {
  state = {
    selectedPlayers: []
  };

  getSelectedPlayers = () => {
    return this.state.selectedPlayers
  };

  renderPlayer = currentPlayer => {
    const updateName = event => {
      const newName = event.target.value
      const nextPlayers = this.state.selectedPlayers.map(player => {
        if (currentPlayer.id === player.id) {
          return { ...player, name: newName }
        } else {
          return player
        }
      })

      this.setState({ selectedPlayers: nextPlayers })
    }

    const updateInitiative = event => {
      const newInitiative = event.target.value
      const nextPlayers = this.state.selectedPlayers.map(player => {
        if (currentPlayer.id === player.id) {
          return { ...player, initiative: newInitiative }
        } else {
          return player
        }
      })
      this.setState({ selectedPlayers: nextPlayers })
    }

    const deletePlayer = () => {
      this.setState({
        selectedPlayers: this.state.selectedPlayers.filter(
          player => player.id !== currentPlayer.id
        )
      })
    }

    return (
      <div key={currentPlayer.id}>
        <input
          type='text'
          name='name'
          value={currentPlayer.name}
          onChange={updateName}
        />
        <input
          type='number'
          name='initiative'
          value={currentPlayer.initiative}
          onChange={updateInitiative}
        />
        <button onClick={deletePlayer}>Delete</button>
      </div>
    )
  };

  onAddPlayer = () => {
    this.setState({
      selectedPlayers: [
        ...this.state.selectedPlayers,
        {
          id: this.state.selectedPlayers.length,
          name: '',
          initiative: 0
        }
      ]
    })
  };

  render () {
    const { selectedPlayers } = this.state

    return (
      <div>
        <h3>Select your players...</h3>
        {selectedPlayers.map(this.renderPlayer)}
        <button onClick={this.onAddPlayer}>+</button>
      </div>
    )
  }
}

export default PartiesSelector
