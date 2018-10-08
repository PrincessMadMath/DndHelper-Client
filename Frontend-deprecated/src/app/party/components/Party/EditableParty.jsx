import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { partyType } from '../../type'
import Party from './Party'
import PartyForm from './PartyForm'

class EditableParty extends Component {
  static propTypes = {
    party: partyType.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  state = {
    isEditing: this.props.party.id === 0
  };

  handlePartyUpdate = party => {
    this.props.onUpdate(party.id, party)
    this.setState({ isEditing: false })
  };

  render () {
    if (this.state.isEditing) {
      return (
        <PartyForm
          party={this.props.party}
          onCompleteParty={this.handlePartyUpdate}
          onCancel={() =>
            this.setState({
              isEditing: false
            })}
        />
      )
    } else {
      return (
        <Party
          party={this.props.party}
          onEdit={() =>
            this.setState({
              isEditing: true
            })}
          onDelete={this.props.onDelete}
        />
      )
    }
  }
}

export default EditableParty
