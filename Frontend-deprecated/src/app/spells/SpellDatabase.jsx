/* Utils */
import React, { Component } from 'react'

import { connect } from 'react-redux'

/* Components */
import { SearchBar } from '../common'
import { SpellsList } from './components'

import store from './'

class SpellDatabase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showed_spells: props.all_spells.slice()
    }

    this.updateSpells = this.updateSpells.bind(this)
  }

  componentWillReceiveProps = nextProps => {
    const { all_spells } = nextProps

    this.setState({
      showed_spells: all_spells
    })
  };

  updateSpells (updatedSpells) {
    this.setState({
      showed_spells: updatedSpells
    })
  }

  render () {
    const { all_spells } = this.props

    return (
      <div>
        <SearchBar searchables={all_spells} callback={this.updateSpells} />
        <SpellsList spellsToRender={this.state.showed_spells} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    all_spells: state[store.constants.NAME]
  }
}

const Database = connect(mapStateToProps)(SpellDatabase)

export default Database
