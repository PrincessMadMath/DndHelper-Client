/* Utils */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LazyLoad, { forceCheck } from 'react-lazyload'

/* Components */
import SpellInfo from './SpellInfo'

/* Style */
import '../../common/style/List.css'

class SpellsList extends Component {
  componentDidUpdate () {
    forceCheck()
  }

  render () {
    return (
      <div className='list'>
        {this.props.spellsToRender.map(function (value) {
          return (
            <LazyLoad key={value.name} height={200} offset={500}>
              <SpellInfo spellToRender={value} />
            </LazyLoad>
          )
        })}
      </div>
    )
  }
}

SpellsList.propType = {
  spellsToRender: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SpellsList
