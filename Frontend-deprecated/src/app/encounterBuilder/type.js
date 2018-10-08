import PropTypes from 'prop-types'

export const encounterMonsterType = PropTypes.shape({
  monsterId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
})

export const encounterType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  monsters: PropTypes.arrayOf(encounterMonsterType).isRequired
})
