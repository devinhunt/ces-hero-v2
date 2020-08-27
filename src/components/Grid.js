import React from 'react'
import styles from '../hero.modules.css'

export const Row = ({children}) => (
  <div className={styles.Row}>{children}</div>
)


export const Col = ({children, style = {}}) => (
  <div className={styles.Col} style={style}>{children}</div>
)