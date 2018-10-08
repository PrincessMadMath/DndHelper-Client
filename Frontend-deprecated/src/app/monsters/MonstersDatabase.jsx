/* Utils */
import React, { Component } from 'react'

import { connect } from 'react-redux'

/* Components */
import { SearchBar } from '../common'
import { MonstersList } from './components'

import store from './'

class MonstersDatabase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showed_monsters: props.all_monsters.slice()
    }

    this.updateMonsters = this.updateMonsters.bind(this)
  }

  componentWillReceiveProps = nextProps => {
    const { all_monsters } = nextProps

    this.setState({
      showed_monsters: all_monsters
    })
  };

  updateMonsters (updatedSpells) {
    this.setState({
      showed_monsters: updatedSpells
    })
  }

  render () {
    const { all_monsters } = this.props

    return (
      <div>
        <SearchBar searchables={all_monsters} callback={this.updateMonsters} />
        <MonstersList monstersToRender={this.state.showed_monsters} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    all_monsters: state[store.constants.NAME]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMonster: monster => {
      dispatch(store.actions.add(monster))
    }
  }
}

const Database = connect(mapStateToProps, mapDispatchToProps)(MonstersDatabase)

export default Database
