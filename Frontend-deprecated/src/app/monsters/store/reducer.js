import * as t from './actionTypes'

const defaultMonsters = require('./data/monsters.json')

const initialState = defaultMonsters

export default (state = initialState, action) => {
  switch (action.type) {
    case t.ADD:
      return [...state, action.monster]

    default:
      return state
  }
}
