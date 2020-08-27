import React from 'react'
import styles from '../hero.modules.css'

const LabeledDataFrame = ({label, data}) => (
  <div className={styles.LabeledDataFrame}>
    <h3>{label}</h3>
    <div className="content">
      {data}
    </div>
  </div>
)

export default LabeledDataFrame