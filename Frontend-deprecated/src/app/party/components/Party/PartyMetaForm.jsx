import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PartyMetaForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onMetaChange: PropTypes.func.isRequired
  };

  handleNameChange = e => {
    this.props.onMetaChange({
      name: e.target.value
    })
  };

  render () {
    return (
      <div>
        <label>
          Party Name:
          <input
            type='text'
            name='name'
            value={this.props.name}
            onChange={this.handleNameChange}
          />
        </label>
      </div>
    )
  }
}

export default PartyMetaForm
