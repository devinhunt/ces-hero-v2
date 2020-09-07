import React from 'react'
import styles from '../hero.modules.css'

const ChartAnnotation = ({
  label,
  x = 0,
  y = 0,
  height = 100
}) => {
  return (
    <g transform={ `translate(${x}, ${y})` }>
      <text className={ styles.AnnotationLabel }>{ label }</text>
      <line 
        className={ styles.AnnotationLine } 
        y1={ 15 }
        y2={ height }
      />
    </g>
  )
}

export default ChartAnnotation