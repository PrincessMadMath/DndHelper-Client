import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EncounterMetaForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onDescriptionChange: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        <div>
          <label>
            Encounter Name:
            <input
              type='text'
              name='name'
              value={this.props.name}
              onChange={this.props.onInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name='description'
              value={this.props.description}
              onChange={this.props.onInputChange}
            />
          </label>
        </div>
      </div>
    )
  }
}

export default EncounterMetaForm
