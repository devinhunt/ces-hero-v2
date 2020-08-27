import { useState, useEffect } from 'react'
import { csv, autoType } from 'd3'

const SOURCE_URL = `https://ces-data.herokuapp.com/data/policy`

export const usePolicyData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      const parseDate = date => new Date(date.substring(0, 4), +date.substring(4, 6) - 1, date.substring(6, 8))

      const response = await csv(SOURCE_URL, row => {
        const datum = {
          state: row['State'],
          id: +row['Fips'],
          policyExists: row['Public Mask Policy'] == 'TRUE',
        }

        if(datum.policyExists) {
          datum.enacted = parseDate(row['Date Enacted'])
          datum.expiry = parseDate(row['Date Expiry'])
        }

        return datum
      })
      setData(response)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return [
    data,
    isLoading
  ]
}