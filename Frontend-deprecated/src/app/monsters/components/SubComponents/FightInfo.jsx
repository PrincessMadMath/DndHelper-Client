/* Utils */
import React from 'react'
import PropTypes from 'prop-types'

const FightInfo = ({ monster }) => {
  return (
    <div>
      <hr />
      <span>
        <b>Armor Class:</b> {monster.armorClass}
      </span>
      <br />
      <span>
        <b>Hit Points:</b> {monster.hitPoints} ({monster.hitDice})
      </span>
      <br />
      <span>
        <b>Speed:</b> {monster.speed}
      </span>
      <br />
    </div>
  )
}

FightInfo.propType = {
  monster: PropTypes.shape({
    armorClass: PropTypes.number.isRequired,
    hitPoints: PropTypes.number.isRequired,
    hitDice: PropTypes.string.isRequired,
    speed: PropTypes.string.isRequired
  }).isRequired
}

export default FightInfo
