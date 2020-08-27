import React from 'react'
import styles from '../hero.modules.css'

const Title = ({color = 'inherit', children}) => (
  <h1 className={styles.Title} style={{color}}>{children}</h1>
)
export default Title