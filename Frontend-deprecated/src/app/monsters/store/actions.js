import * as t from './actionTypes'

export function add (monster) {
  return {
    type: t.ADD,
    monster
  }
}
