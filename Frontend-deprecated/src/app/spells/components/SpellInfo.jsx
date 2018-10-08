/* Utils */
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

/* Components */
import Components from './Components'

/* Style */
import './style/Spell.css'
import '../../common/style/ManualStyle.css'

const showdown = require('showdown')
const converter = new showdown.Converter()

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup (text) {
  return {
    __html: converter.makeHtml(text)
  }
}

const SpellInfo = ({ spellToRender }) => {
  return (
    <div className='information-box'>
      <Grid bsClass='grid'>
        <Row>
          <Col xs={12} sm={8}>
            <h1 className='spell-title'>
              {spellToRender.name}
            </h1>
            <div className='spell-type'>
              <span>
                {spellToRender.type}
              </span>
              <span>
                {spellToRender.canBeRitual && ' (ritual)'}{' '}
              </span>
            </div>
          </Col>
          <Col xs={12} sm={4}>
            <div className='spell-components'>
              <Components components={spellToRender.components} />
            </div>
          </Col>
        </Row>
      </Grid>
      <div className='spell-quick-info'>
        <p>
          <b>Range: </b>
          {spellToRender.range}
          <br />
          <b>Duration: </b>
          {spellToRender.duration}
          <br />
          <b>Casting time: </b>
          {spellToRender.castingTime}
          <br />
        </p>
      </div>
      <p dangerouslySetInnerHTML={createMarkup(spellToRender.description)} />
      {spellToRender.higherLevel &&
        <p>
          <b>At higher level. </b>
          {spellToRender.higherLevel}
        </p>}
      <p>
        <b>Class:</b> {spellToRender.class.join(', ')}
      </p>
    </div>
  )
}

SpellInfo.propType = {
  spellToRender: PropTypes.shape({
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    castingTime: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    components: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    higherLevel: PropTypes.string.isRequired,
    class: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
}

export default SpellInfo
