/* Utils */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* Style */
import './style/SearchBar.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.filtered = this.filtered.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  filtered (name) {
    function contains (value) {
      // OMG FIX THIS!!!!
      var bigTempHack = value.name != null ? value.name : value.Name
      return bigTempHack.toLowerCase().includes(name.toLowerCase())
    }

    var filteredList = this.props.searchables.filter(contains)

    this.props.callback(filteredList)
  }

  handleNameChange (event) {
    this.filtered(event.target.value)
  }

  render () {
    return (
      <div className='search-bar'>
        <input
          type='text'
          onChange={this.handleNameChange}
          autoFocus
          placeholder='Search by name: '
        />
      </div>
    )
  }
}

SearchBar.propType = {
  searchables: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SearchBar
