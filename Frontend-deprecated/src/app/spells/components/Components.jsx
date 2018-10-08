/* Utils */
import React from 'react'
import PropTypes from 'prop-types'
import { Popover, OverlayTrigger } from 'react-bootstrap'

/* Style */
import './style/Component.css'

/* Components */
import ComponentIcon from './ComponentIcon'

/* Components icon */
import concentration from './icon/concentration.svg'
import verbal from './icon/verbal.svg'
import somatic from './icon/somatic.svg'
import material from './icon/material.svg'
import material_money from './icon/material_money.svg'

const PopOver = components => {
  return components.material === false
    ? <div />
    : <Popover id='Required Materials' title='Required Materials'>
      {components.requiredGold > 0 &&
      <div>
        <strong>Cost: </strong> {components.requiredGold} golds
          </div>}
      <strong>Ingredients: </strong> {components.ingredients}
    </Popover>
}

const Components = ({ components }) => {
  return (
    <div className='component-list'>
      <ComponentIcon
        isRequired={components.concentration}
        icon={concentration}
        alternative='Concentration'
      />
      <ComponentIcon
        isRequired={components.verbal}
        icon={verbal}
        alternative='Verbal'
      />
      <ComponentIcon
        isRequired={components.somatic}
        icon={somatic}
        alternative='Somatic'
      />
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement='bottom'
        overlay={PopOver(components)}
      >
        <div>
          <ComponentIcon
            isRequired={components.material}
            icon={components.requiredGold > 0 ? material_money : material}
            alternative='Meterial'
          />
        </div>
      </OverlayTrigger>
    </div>
  )
}

Components.propTypes = {
  components: PropTypes.shape({
    concentration: PropTypes.bool.isRequired,
    somatic: PropTypes.bool.isRequired,
    verbal: PropTypes.bool.isRequired,
    material: PropTypes.bool.isRequired
  })
}

export default Components
