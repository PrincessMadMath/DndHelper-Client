import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { partyType } from '../../type'
import EditableParty from './EditableParty'

class EditablePartyList extends Component {
  static propTypes = {
    parties: PropTypes.arrayOf(partyType).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        {this.props.parties.map(party =>
          <EditableParty
            key={party.id}
            party={party}
            onUpdate={this.props.onUpdate}
            onDelete={this.props.onDelete}
          />
        )}
      </div>
    )
  }
}

export default EditablePartyList
