import React, { Fragment } from 'react'
import { scaleLinear, scaleBand, range, max, min } from 'd3'

import PositivityLegend from './PositivityLegend'

import styles from '../hero.modules.css'

import { roundToPercision } from '../data/utilities'
import { DEEP_RED, RED, YELLOW, GREEN } from '../data/constants'

const MAX_POSITIVITY = .35

const PositivityChart = ({
  rawData,
  width = 300,
  height = 100,
  margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 0,
  }
}) => {
  

  const xBand = scaleBand()
    .domain(range(rawData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const rawDataMax = min([max(rawData, d => d.value), MAX_POSITIVITY])
  
  const y = scaleLinear()
    .domain([0, max([rawDataMax, .2])])
    .range([height - margin.bottom, margin.top])
    .nice()

  const colorForRate = rate => {
    if(rate >= .1) {
      return DEEP_RED
    }
    
    if(rate >= .05) {
      return RED
    }
    
    if(rate >= .03) {
      return YELLOW
    }

    return GREEN
  }


  return (
    <g>
      {rawData.map( (datum, index) => (
        <rect
          key={index}
          width={ xBand.bandwidth() } 
          height={ y(0) - y(min([datum.value || 0, MAX_POSITIVITY])) }
          x={ xBand(index) }
          y={ y(min([datum.value, MAX_POSITIVITY])) }
          fill={ colorForRate(datum.value) }
        />
      ))}
      <PositivityLegend x={ margin.left } y={ 30 } />
    </g>
  )
}
export default PositivityChart