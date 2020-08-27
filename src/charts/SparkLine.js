import React from 'react'
import {extent, line, scaleLinear, format} from 'd3'
import styles from '../hero.modules.css'

const SparkLine = ({
  data, 
  width, 
  height, 
  margin = {
    left: 35,
    right: 35,
    top: 5,
    bottom: 5,
  },
  labelFormat = ''
}) => {

  const x = scaleLinear()
    .domain([0, data.length])
    .range([margin.left, width - margin.right])
  
  const y = scaleLinear()
    .domain(extent(data))
    .range([height - margin.bottom, margin.top])
  
  const sparkLine = line()
    .x( (d, i) => x(i))
    .y( d => y(d) )

  return (
    <svg
      className={styles.chartSparkline}
      width={width}
      height={height}
    >
      <path d={sparkLine(data)} />
      <g transform={`translate(${x(0)}, ${y(data[0])})`}>
        <circle cx="0" cy="0" r="1.5"/>
        <text x="-5" y="0"
          textAnchor="end"
          alignmentBaseline="middle"
        >
          {format(labelFormat)(data[0])}
        </text>
      </g>
      <g transform={`translate(${x(data.length - 1)}, ${y(data[data.length - 1])})`}>
        <circle cx="0" cy="0" r="1.5"/>
        <text x="5" y="0"
          textAnchor="start"
          alignmentBaseline="middle"
        >
          {format(labelFormat)(data[data.length - 1])}
        </text>
      </g>
    </svg>
  )
}

export default SparkLine