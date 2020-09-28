import React, { Fragment } from 'react'
import { scaleLinear, scaleBand, range, max, line } from 'd3'
import styles from '../hero.modules.css'
import { roundToPercision } from '../data/utilities'

const CasesChart = ({
  rawData,
  rawDataLabel,
  trendData = null,
  trendDataLabel,
  title,
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

  const rawDataMax = max(rawData, d => d.value)
  
  const y = scaleLinear()
    .domain([0, rawDataMax])
    .range([height - margin.bottom, margin.top])
    .nice()
  

  const renderTrendLine = () => {
    const x = scaleLinear()
    .domain([0, trendData.length])
    .range([margin.left + xBand.bandwidth() / 2, width - margin.right + xBand.bandwidth() / 2])

    const trendLine = line()
    .x( (d, i) => x(i))
    .y( d => y(d.value || 0) )

    return (
      <path d={ trendLine(trendData) } fill="none" stroke="rgba(255, 100, 100, .9)" strokeWidth="1.5"/>
    )
  }

  const renderRawLabel = () => {
    const dataIndex = Math.floor(rawData.length * .4)
    const target = {
      x: xBand(dataIndex),
      y: y(rawData[dataIndex].value)
    }
    
    return (
      <g transform={`translate(${target.x}, ${target.y})`}>
        <text className={styles.TimeSeriesTitle}>{ rawDataLabel }</text>
      </g>
    )
  }

  const renderYAxisLabels = () => {
    const rawDataMidPoint = roundToPercision(rawDataMax / 2, 10)

    return (
      <Fragment>
        <g transform={`translate(${0}, ${y(0)})`}>
          <text className={styles.AxisText} x={margin.left} y={-4}>0 cases</text>
          <line className={styles.AxisMidpointLine} x1={margin.left} x2={width - margin.right} y1={0} y2={0} />
        </g>
        <g transform={`translate(${0}, ${y(rawDataMidPoint)})`}>
          <text className={styles.AxisText} x={margin.left} y={-4}>{rawDataMidPoint} cases</text>
          <line className={styles.AxisMidpointLine} x1={margin.left} x2={width - margin.right} y1={0} y2={0} />
        </g>
      </Fragment>
    )
  }

  const renderLegend = () => (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <rect width="10" height="10" fill="rgba(255, 100, 100, .3)"/>
      <text x="15" y="8" className={styles.AxisText}>{ rawDataLabel }</text>
      {trendDataLabel && (
        <Fragment>
          <line x1="0" x2="10" y1="20" y2="20" fill="none" stroke="rgba(255, 100, 100, .9)" strokeWidth="1.5" />
          <text x="15" y="23" className={styles.AxisText}>{ trendDataLabel }</text>
        </Fragment>
      )}
    </g>
  )

  return (
    <g>
      { title && (
        <text className={styles.TimeSeriesTitle} x={margin.left} y={margin.top} >{title}</text>
      )}
      { renderYAxisLabels() }
      {rawData.map( (datum, index) => (
        <rect
          key={index}
          width={ xBand.bandwidth() } 
          height={ y(0) - y(datum.value || 0) }
          x={ xBand(index) }
          y={ y(datum.value) }
          fill="rgba(255, 100, 100, .3)"
        />
      ))}
      { trendData && renderTrendLine() }
      { renderLegend() }
    </g>
  )
}
export default CasesChart