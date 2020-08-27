import React from 'react'
import ReactDOM from 'react-dom'
import Hero from './Hero'

window.CESHero = hostElement => ReactDOM.render(<Hero />, hostElement)
