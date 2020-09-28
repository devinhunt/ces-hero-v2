import React from 'react';
import styles from '../hero.modules.css'

const DataLoading = () => {

  return (
    <div className={styles.DataLoading}>
      <div>
        <div className={styles.DataLoadingSpinner} />
        Loading
      </div>
    </div>
  )
}

export default DataLoading