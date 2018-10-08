/* Utils */
import React from 'react'
import PropTypes from 'prop-types'

function modifierCalculator (value) {
  var modifier
  if (value > 10) {
    value -= 10
    modifier = '+' + Math.floor(value / 2)
  } else {
    value -= 10
    modifier = Math.floor(value / 2)
  }

  return modifier
}

const Ability = ({ name, value }) => {
  return (
    <div className='ability'>
      <div>
        <b>
          {name.substring(0, 3).toUpperCase()}
        </b>
      </div>
      <div>
        <span>
          {value} ({modifierCalculator(value)})
        </span>
      </div>
    </div>
  )
}

const Abilities = ({ abilities }) => {
  return (
    <div>
      <hr />
      <div className='abilities'>
        <Ability name='Strength' value={abilities.strength} />
        <Ability name='Dexterity' value={abilities.dexterity} />
        <Ability name='Constitution' value={abilities.constitution} />
        <Ability name='Intelligence' value={abilities.intelligence} />
        <Ability name='Wisdom' value={abilities.wisdom} />
        <Ability name='Charisma' value={abilities.charisma} />
      </div>
    </div>
  )
}

Abilities.propType = {
  spellToRender: PropTypes.shape({
    strength: PropTypes.number.isRequired,
    dexterity: PropTypes.number.isRequired,
    constitution: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired,
    wisdom: PropTypes.number.isRequired,
    charisma: PropTypes.number.isRequired
  }).isRequired
}

export default Abilities
