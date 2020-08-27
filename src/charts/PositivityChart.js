import React, { Fragment } from 'react'
import { scaleLinear, scaleBand, range, max, line } from 'd3'
import styles from '../hero.modules.css'
import { roundToPercision } from '../data/utilities'
import { DEEP_RED, RED, YELLOW, GREEN } from '../data/constants'

const PositivityChart = ({
  rawData,
  rawDataLabel,
  width = 300,
  height = 100,
  margin = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  }
}) => {
  
  const xBand = scaleBand()
    .domain(range(rawData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

  const rawDataMax = max(rawData, d => d.value)
  
  const y = scaleLinear()
    .domain([0, rawDataMax])
    .range([height - margin.bottom, margin.top])
    .nice()

  const renderYAxisLabels = () => {
    const rawDataMidPoint = roundToPercision(rawDataMax / 2, .1)

    return (
      <Fragment>
        {/* <g transform={`translate(${0}, ${y(0)})`}>
          <text className={styles.AxisText} x={margin.left} y={-4}>0%</text>
        </g> */}
        <g transform={`translate(${0}, ${y(rawDataMidPoint)})`}>
          <text className={styles.AxisText} x={margin.left} y={-4}>{rawDataMidPoint * 100}%</text>
          <line className={styles.AxisMidpointLine} x1={margin.left} x2={width - margin.right} y1={0} y2={0} />
        </g>
      </Fragment>
    )
  }

  const legendData = [
    [GREEN, '<3% positivity rate'],
    [YELLOW, '3% - 5%'],
    [RED, '5% - 10%'],
    [DEEP_RED, '10% +'],
  ]

  const renderLegend = () => (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      { legendData.map( (item, index) => (
      <g transform={`translate(0, ${ index * 15 })`}>
        <rect width="10" height="10" fill={ item[0] }/>
        <text x="15" y="8" className={ styles.AxisText }>{ item[1] }</text>
      </g>
      )) }
    </g>
  )

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
          height={ y(0) - y(datum.value || 0) }
          x={ xBand(index) }
          y={ y(datum.value) }
          fill={ colorForRate(datum.value) }
        />
      ))}
      { renderLegend() }
    </g>
  )
}
export default PositivityChart