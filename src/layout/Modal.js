const { style } = require("d3");
import React from 'react'

import styles from '../hero.modules.css'

import Title from '../components/Title'
import Button from '../components/Button'

const Modal = ({title = 'Modal', onClose, children}) => (
  <div className={styles.Modal}>
    <header>
      <Title>{title}</Title> 
      <Button onClick={() => onClose() }>Close</Button>
    </header>
    <div className={styles.ModalContent}>
      {children}
    </div>
  </div>
)

export default Modal