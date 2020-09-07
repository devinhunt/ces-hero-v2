import React from 'react'
import styles from '../hero.modules.css'
import { DEEP_RED, RED, YELLOW, GREEN } from '../data/constants'

const PositivityLegend = ({
  x = 0,
  y = 0
}) => {
  const legendData = [
    [GREEN, '<3% positivity rate'],
    [YELLOW, '3% - 5%'],
    [RED, '5% - 10%'],
    [DEEP_RED, '10% +'],
  ]

  return (
    <g transform={`translate(${x}, ${y})`}>
      { legendData.map( (item, index) => (
      <g key={index} transform={`translate(0, ${ index * 15 })`}>
        <rect width="10" height="10" fill={ item[0] }/>
        <text x="15" y="8" className={ styles.AxisText }>{ item[1] }</text>
      </g>
      )) }
    </g>
  )
}

export default PositivityLegend