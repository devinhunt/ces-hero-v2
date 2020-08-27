import React, { useMemo } from 'react'
import { scaleTime, timeFormat } from 'd3'
import styles from '../hero.modules.css'

const DateAxis = ({
  domain=[Date.now(), Date.now() + 24 * 60 * 60 * 1000],
  range=[10, 290]
}) => {

  const ticks = useMemo(() => {
    const x = scaleTime()
      .domain(domain)
      .range(range)
      
    
    const width = range[1] - range[0]
    const pixelPerTick = 70
    const numberOfTicks = Math.max(1, Math.floor(width / pixelPerTick))
    
    return x.ticks(numberOfTicks).map( value => ({
      value, 
      offset: x(value)
    }))
  }, [
    domain.join('-'),
    range.join('-')
  ])

  const dateFormat = timeFormat('%b %d')

  return (
    <g className={ styles.axis }>
      <path 
        d={[
          'M', range[0], 6,
          'v', -6,
          'H', range[1],
          'v', 6,
        ].join(' ')}
        fill="none"
        stroke="black"
      />
      {ticks.map( ({value, offset}) => (
        <g key={value} transform={`translate(${offset}, 0)`}>
          <line y2="6" stroke="currentColor" />
          <text key={value}>{ dateFormat(value) }</text>
        </g>
      ))}
    </g>
  )
}
export default DateAxis;