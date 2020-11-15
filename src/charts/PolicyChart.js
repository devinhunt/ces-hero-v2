import React from 'react'
import { scaleTime } from 'd3'
import CasesChart from './CasesChart'
import PositivityChart from './PositivityChart'
import DateAxis from './DateAxis'
import ChartAnnotation from './ChartAnnotation'

const PolicyChart = ({
  rawCasesSeries, 
  trendCasesSeries,
  positivitySeries,
  policyData, 
  width = 800,
  height = 300,
}) => {
  const dateEnd = rawCasesSeries[rawCasesSeries.length - 1].date
  const dateStart = rawCasesSeries[0].date
  
  const xScale = scaleTime()
    .domain([dateStart, dateEnd])
    .range([10, width - 10])

  return (
    <svg width={width} height={height}>
      <g transform={`translate(0, 5)`}>
        <CasesChart
          width={width}
          height={height * .6}
          rawData={rawCasesSeries}
          rawDataLabel="Cases per million"
          trendData={trendCasesSeries}
          trendDataLabel="Trend"
        />
      </g>
      <g transform={`translate(0, ${height * .6})`}>
        <PositivityChart
          width={width}
          height={height * .3}
          rawData={positivitySeries}
        />
      </g>
      <g transform={`translate(0, ${height * .9})`}>
        <DateAxis domain={[dateStart, dateEnd]} range={[10, width - 10]} />
      </g>
    </svg>
  )
}

export default PolicyChart