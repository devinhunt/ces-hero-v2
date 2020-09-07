import React from 'react'
import styles from '../hero.modules.css'

const ColorDot = ({color = "black", flashing = false}) => {
  const classes = [styles.ColorDot]

  if(flashing) {
    classes.push(styles.ColorDotFlashing)
  }

  return (
    <div className={classes.join(' ')} style={{ backgroundColor: color }} />
  )
}

export default ColorDot