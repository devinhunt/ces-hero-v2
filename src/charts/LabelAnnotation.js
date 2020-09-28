import React from 'react'

import styles from '../hero.modules.css'

const LabelAnnotation = ({
  text,
  from = [0, 0],
  to = [0, 0]
}) => {

  const x = from[0]
  const y = from[1]
  const offsetX = to[0] - from[0]
  const offsetY = to[1] - from[1]

  return (
    <g transform={ `translate(${x}, ${y})` }>
      <line 
        x1={ 0 } 
        y1={ 0 } 
        x2={ offsetX } 
        y2={ offsetY } 
        strokeWidth="1.5" 
        fill="none" 
        stroke="black" 
      />
      <text 
        fontSize="15"
        transform={ `translate(${offsetX + 2}, ${offsetY + 14})` }
      >
        { text }
      </text>
    </g>
  )
}

export default LabelAnnotation