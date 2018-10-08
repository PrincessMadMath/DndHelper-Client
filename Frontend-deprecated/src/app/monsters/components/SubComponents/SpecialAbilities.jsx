/* Utils */
import React from 'react'

/* Style */
import './Style/MonsterInfoElement.css'
import PropTypes from 'prop-types'

const showdown = require('showdown')
const converter = new showdown.Converter()

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup (text) {
  return {
    __html: converter.makeHtml(text)
  }
}

const SpecialAbility = ({ specialAbility }) => {
  const fullText = `***${specialAbility.name}*** ${specialAbility.desc}`

  return (
    <div>
      <p dangerouslySetInnerHTML={createMarkup(fullText)} />
    </div>
  )
}

const SpecialAbilities = ({ title, specialAbilities }) => {
  if (specialAbilities == null || specialAbilities.length === 0) {
    return <div />
  }

  return (
    <div>
      <h2>
        {title}
      </h2>
      <hr />
      {specialAbilities.map(function (value) {
        return (
          <div key={value.name}>
            <SpecialAbility specialAbility={value} />
          </div>
        )
      })}
    </div>
  )
}

SpecialAbility.propType = {
  specialAbility: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string
  }).isRequired
}

export default SpecialAbilities
