import React from 'react'
import styles from '../hero.modules.css'

const Button = ({children, onClick}) => (
  <button className={styles.Button} onClick={ e => onClick(e) }>
    {children}
  </button>
)

export default Button