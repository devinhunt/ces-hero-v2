import React, { useEffect, useRef } from 'react'

import styles from '../hero.modules.css'

import Title from '../components/Title'
import Button from '../components/Button'

const Modal = ({title = 'Modal', onClose, children}) => {

  const modalEl = useRef(null);

  useEffect( () => {
    const closeClickTest = event => {
      if(event.target !== modalEl.current && !modalEl.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('click', closeClickTest)
    return () => document.removeEventListener('click', closeClickTest)
  }, [])
  
  return (
    <div className={ styles.Modal } ref={ modalEl }>
      <header>
        <Title>{title}</Title> 
        <Button onClick={() => onClose() }>Close</Button>
      </header>
      <div className={styles.ModalContent}>
        {children}
      </div>
    </div>
  )
}

export default Modal