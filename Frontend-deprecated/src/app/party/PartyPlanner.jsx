/* Utils */
import React, { Component } from 'react'

import { connect } from 'react-redux'

import partyModule from './'

import EditablePartyList from './components/Party/EditablePartyList'
import ToggleableParty from './components/Party/ToggleableParty'

class MasterManager extends Component {
  render () {
    return (
      <div>
        <h1>Tavern</h1>
        <EditablePartyList
          parties={this.props.parties}
          onUpdate={this.props.updateParty}
          onDelete={this.props.deleteParty}
        />
        <ToggleableParty createParty={this.props.createParty} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { parties: state[partyModule.store.NAME] }
}

const mapDispatchToProps = dispatch => {
  return {
    createParty: party => {
      dispatch(partyModule.store.createParty(party))
    },
    updateParty: (id, party) => {
      dispatch(partyModule.store.updateParty(id, party))
    },
    deleteParty: id => {
      dispatch(partyModule.store.deleteParty(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterManager)
