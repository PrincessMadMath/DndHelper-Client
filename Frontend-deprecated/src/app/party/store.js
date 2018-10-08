export const NAME = 'party'

/* Action type */
export const CREATE = 'party/create'
export const DELETE = 'party/delete'
export const UPDATE = 'party/update'

/* Action creator */
export function createParty (party) {
  return { type: CREATE, party }
}

export function deleteParty (id) {
  return { type: DELETE, id }
}

export function updateParty (id, party) {
  return { type: UPDATE, id, party }
}

/* Reducer */

const initialState = []

function create (parties, action) {
  return [
    ...parties,
    {
      id: action.party.id,
      name: action.party.name,
      players: action.party.players
    }
  ]
}

function remove (parties, action) {
  return parties.filter(x => x.id !== action.id)
}

function update (parties, action) {
  return parties.map(x => {
    if (x.id === action.id) {
      return action.party
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
