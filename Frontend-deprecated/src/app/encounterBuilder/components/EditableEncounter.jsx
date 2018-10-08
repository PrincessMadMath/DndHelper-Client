import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { encounterType } from '../type'

class EditableEncounter extends Component {
  static propTypes = {
    encounter: encounterType.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  renderEncounterMonster = encounterMonster => {
    return (
      <div>
        {encounterMonster.monsterId} {encounterMonster.count}
      </div>
    )
  };

  handleEdit = () => {
    this.props.onEdit(this.props.encounter.id)
  };

  handleDelete = () => {
    this.props.onDelete(this.props.encounter.id)
  };

  render () {
    const { encounter } = this.props
    return (
      <div>
        <h3>
          {encounter.name}
        </h3>
        <div>
          {encounter.monsters.map(this.renderEncounterMonster)}
        </div>
        <button onClick={this.handleEdit}>Edit encounter</button>
        <button onClick={this.handleDelete}>Delete encounter</button>
      </div>
    )
  }
}

export default EditableEncounter
