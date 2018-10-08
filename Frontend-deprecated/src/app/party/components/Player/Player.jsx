/* Utils */
import React from 'react'

const Player = ({ player, onEdit, onDelete }) => {
  return (
    <div>
      <h4 style={{ display: 'inline' }}>
        {player.name}
      </h4>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Player
