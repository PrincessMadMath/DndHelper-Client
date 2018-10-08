import uuidv4 from 'uuid/v4'

export const NAME = 'encounters'

/* Action types */
export const CREATE = 'encounter/create'
export const DELETE = 'encounter/delete'
export const UPDATE = 'encounter/update'

/* Action creator */
export function createEncounter (encounter) {
  return { type: CREATE, encounter }
}

export function deleteEncounter (id) {
  return { type: DELETE, id }
}

export function updateEncounter (id, encounter) {
  return { type: UPDATE, id, encounter }
}

/* Reducer */

const initialState = [
  {
    id: 'test',
    name: 'Test encounter',
    description: 'bla bla bla',
    monsters: [
      { monsterId: 'Aboleth', count: 2 },
      { monsterId: 'Acolyte', count: 1 }
    ]
  }
]

function create (encounters, action) {
  return [...encounters, { ...action.encounter, id: uuidv4() }]
}

function remove (encounters, action) {
  return encounters.filter(x => x.id !== action.id)
}

function update (encounters, action) {
  return encounters.map(x => {
    if (x.id === action.id) {
      return action.encounter
    } else {
      return x
    }
  })
}

export function reducer (state = initialState, action) {
  switch (action.type) {
    case CREATE:
      return create(state, action)

    case DELETE:
      return remove(state, action)

    case UPDATE:
      return update(state, action)

    default:
      return state
  }
}
