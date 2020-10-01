import { useState, useEffect } from 'react'
import { csv, autoType } from 'd3'
import { stateNameToFips } from './stateCovidDataService'
import { groupTrendByISODate } from './utilities'

const SOURCE_URL = `https://ces-data.herokuapp.com/data/trend`

export const useTrendData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await csv(SOURCE_URL, autoType)

      const safariDatePatch = date => new Date(date.replace(/ /g, 'T'))

      let trendData = response.map( (state) => ({
        'name': state.State,
        'id': +stateNameToFips(state.State),
        'date': new Date(state.date),
        'casesRaw': groupTrendByISODate(state, safariDatePatch(state.date), 'cases-per-million-raw-'),
        'casesSpline': groupTrendByISODate(state, safariDatePatch(state.date), 'cases-per-million-3dcs-'),
        'positivitySpline': groupTrendByISODate(state, safariDatePatch(state.date), 'positivity-3dcs-'),
      }))

      // Data from Feb 1st hack
      const cutoffDate = new Date(2020, 1, 1)
      trendData.forEach( state => {
        state.casesRaw = state.casesRaw.filter(datum => datum.date > cutoffDate)
        state.casesSpline = state.casesSpline.filter(datum => datum.date > cutoffDate)
        state.positivitySpline = state.positivitySpline.filter(datum => datum.date > cutoffDate)
      })
      setData(trendData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return [
    data,
    isLoading
  ]
}