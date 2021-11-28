import React from 'react'

const Display = ({ counter }) => {
  return (
    <div className="count">
      <span>Counter value : {!isNaN(counter) ? counter : 0}</span>
    </div>
  )
}

export default Display
