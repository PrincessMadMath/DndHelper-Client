import React, { Component } from 'react'
import { connect } from 'react-redux'

import encounterBuilderModule from './'

import EncounterBuilder from './components/EncounterBuilder'
import EncounterDatabase from './components/EncounterDatabase'

class EncountersDashboard extends Component {
  state = {
    isEditing: false,
    editingEncounter: {}
  };

  handleOnAdd = () => {
    this.setState({
      isEditing: true,
      editingEncounter: generateEncounter()
    })
  };

  handleOnEdit = id => {
    const encounter = this.props.encounters.find(x => x.id === id)
    this.setState({ isEditing: true, editingEncounter: encounter })
  };

  handleOnEditComplete = encounter => {
    if (encounter.id) {
      this.props.updateEncounter(encounter.id, encounter)
    } else {
      this.props.createEncounter(encounter)
    }

    this.setState({
      isEditing: false,
      editingEncounter: {}
    })
  };

  handleOnEditCancel = () => {
    this.setState({
      isEditing: false,
      editingEncounter: {}
    })
  };

  handleOnDelete = id => {
    this.props.deleteEncounter(id)
  };

  render () {
    if (this.state.isEditing) {
      return (
        <div>
          <EncounterBuilder
            encounter={this.state.editingEncounter}
            onComplete={this.handleOnEditComplete}
            onCancel={this.handleOnEditCancel}
          />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Encounters Dashboard</h1>
          <EncounterDatabase
            encounters={this.props.encounters}
            onAdd={this.handleOnAdd}
            onEdit={this.handleOnEdit}
            onDelete={this.handleOnDelete}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return { encounters: state[encounterBuilderModule.store.NAME] }
}

const mapDispatchToProps = dispatch => {
  return {
    createEncounter: encounter => {
      dispatch(encounterBuilderModule.store.createEncounter(encounter))
    },
    updateEncounter: (id, encounter) => {
      dispatch(encounterBuilderModule.store.updateEncounter(id, encounter))
    },
    deleteEncounter: id => {
      dispatch(encounterBuilderModule.store.deleteEncounter(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EncountersDashboard
)

function generateEncounter () {
  return {
    id: '',
    name: '',
    description: '',
    monsters: []
  }
}
