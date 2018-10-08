import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { encounterType } from '../type'

import EditableEncounter from './EditableEncounter'

class EncounterDatabase extends Component {
  static propTypes = {
    encounters: PropTypes.arrayOf(encounterType).isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        <h2>Encounter database</h2>
        <div>
          {this.props.encounters.map(x =>
            <EditableEncounter
              encounter={x}
              onEdit={this.props.onEdit}
              onDelete={this.props.onDelete}
            />
          )}
        </div>
        <button onClick={this.props.onAdd}>Add encounter</button>
      </div>
    )
  }
}

export default EncounterDatabase
