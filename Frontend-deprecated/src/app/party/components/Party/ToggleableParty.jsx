import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uuidv4 from 'uuid/v4'

import PartyForm from './PartyForm'

class EditableParty extends Component {
  static propTypes = {
    createParty: PropTypes.func.isRequired
  };

  state = {
    isOpen: false,
    party: {}
  };

  handleFormSubmit = party => {
    this.props.createParty(party)
    this.setState({ isOpen: false })
  };

  handleCreateParty = () => {
    this.setState({ party: generateParty(), isOpen: true })
  };

  handleCancel = () => {
    this.setState({ isOpen: false })
  };

  render () {
    if (this.state.isOpen) {
      return (
        <PartyForm
          party={this.state.party}
          onCompleteParty={this.handleFormSubmit}
          onCancel={this.handleCancel}
        />
      )
    } else {
      return (
        <div>
          <button onClick={this.handleCreateParty}>Create Party</button>
        </div>
      )
    }
  }
}

function generateParty () {
  return { id: uuidv4(), name: '', players: [] }
}

export default EditableParty
