import React, { useState, useEffect } from 'react'
import { csv, group } from 'd3'
import { findKey } from 'lodash'
import { groupTrend } from './utilities'

const SOURCE_URL = `https://ces-data.herokuapp.com/data/default`

export const useStateCovidData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await csv(SOURCE_URL)
      
      response.forEach( datum => {
        // Clean trends
        datum['trend_cases'] = groupTrend(datum, 'CASES-T-').map(p => +p)
        datum['trend_positivity'] = groupTrend(datum, 'POSITIVITY-', 0, 2).map(p => {
          const num = p.substring(0, p.length - 1)
          return +num / 100
        })

        // truncate cases trend to 14 days only
        const tcLength = datum['trend_cases'].length
        datum['trend_cases'] = datum['trend_cases'].slice(tcLength - 14, tcLength)
      
        // Append FIPS codes
        datum.FIPS = stateNameToFips(datum.STATE)
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

export const idToStateData = (id, stateData) => stateData.filter( obj => obj.FIPS == id )[0]

export const stateNameToFips = name => findKey(fipsMap, obj => obj.name.toLowerCase() == name.toLowerCase())

export const fipsMap = {
  "01": {
    abbreviation: "AL",
    name: "Alabama",
  },
  "02": {
    abbreviation: "AK",
    name: "Alaska",
  },
  "03": {
    abbreviation: "AS",
    name: "American Samoa",
  },
  "04": {
    abbreviation: "AZ",
    name: "Arizona",
  },
  "05": {
    abbreviation: "AR",
    name: "Arkansas",
  },
  "06": {
    abbreviation: "CA",
    name: "California",
  },
  "07": {
    abbreviation: "CZ",
    name: "Canal Zone",
  },
  "08": {
    abbreviation: "CO",
    name: "Colorado",
  },
  "09": {
    abbreviation: "CT",
    name: "Connecticut",
  },
  "10": {
    abbreviation: "DE",
    name: "Delaware",
  },
  "11": {
    abbreviation: "DC",
    name: "District Of Columbia",
  },
  "12": {
    abbreviation: "FL",
    name: "Florida",
  },
  "13": {
    abbreviation: "GA",
    name: "Georgia",
  },
  "14": {
    abbreviation: "GU",
    name: "Guam",
  },
  "15": {
    abbreviation: "HI",
    name: "Hawaii",
  },
  "16": {
    abbreviation: "ID",
    name: "Idaho",
  },
  "17": {
    abbreviation: "IL",
    name: "Illinois",
  },
  "18": {
    abbreviation: "IN",
    name: "Indiana",
  },
  "19": {
    abbreviation: "IA",
    name: "Iowa",
  },
  "20": {
    abbreviation: "KS",
    name: "Kansas",
  },
  "21": {
    abbreviation: "KY",
    name: "Kentucky",
  },
  "22": {
    abbreviation: "LA",
    name: "Louisiana",
  },
  "23": {
    abbreviation: "ME",
    name: "Maine",
  },
  "24": {
    abbreviation: "MD",
    name: "Maryland",
  },
  "25": {
    abbreviation: "MA",
    name: "Massachusetts",
  },
  "26": {
    abbreviation: "MI",
    name: "Michigan",
  },
  "27": {
    abbreviation: "MN",
    name: "Minnesota",
  },
  "28": {
    abbreviation: "MS",
    name: "Mississippi",
  },
  "29": {
    abbreviation: "MO",
    name: "Missouri",
  },
  "30": {
    abbreviation: "MT",
    name: "Montana",
  },
  "31": {
    abbreviation: "NE",
    name: "Nebraska",
  },
  "32": {
    abbreviation: "NV",
    name: "Nevada",
  },
  "33": {
    abbreviation: "NH",
    name: "New Hampshire",
  },
  "34": {
    abbreviation: "NJ",
    name: "New Jersey",
  },
  "35": {
    abbreviation: "NM",
    name: "New Mexico",
  },
  "36": {
    abbreviation: "NY",
    name: "New York",
  },
  "37": {
    abbreviation: "NC",
    name: "North Carolina",
  },
  "38": {
    abbreviation: "ND",
    name: "North Dakota",
  },
  "39": {
    abbreviation: "OH",
    name: "Ohio",
  },
  "40": {
    abbreviation: "OK",
    name: "Oklahoma",
  },
  "41": {
    abbreviation: "OR",
    name: "Oregon",
  },
  "42": {
    abbreviation: "PA",
    name: "Pennsylvania",
  },
  "43": {
    abbreviation: "PR",
    name: "Puerto Rico",
  },
  "44": {
    abbreviation: "RI",
    name: "Rhode Island",
  },
  "45": {
    abbreviation: "SC",
    name: "South Carolina",
  },
  "46": {
    abbreviation: "SD",
    name: "South Dakota",
  },
  "47": {
    abbreviation: "TN",
    name: "Tennessee",
  },
  "48": {
    abbreviation: "TX",
    name: "Texas",
  },
  "49": {
    abbreviation: "UT",
    name: "Utah",
  },
  "50": {
    abbreviation: "VT",
    name: "Vermont",
  },
  "51": {
    abbreviation: "VA",
    name: "Virginia",
  },
  "52": {
    abbreviation: "VI",
    name: "Virgin Islands",
  },
  "53": {
    abbreviation: "WA",
    name: "Washington",
  },
  "54": {
    abbreviation: "WV",
    name: "West Virginia",
  },
  "55": {
    abbreviation: "WI",
    name: "Wisconsin",
  },
  "56": {
    abbreviation: "WY",
    name: "Wyoming",
  },
  "72": {
    abbreviation: "PR",
    name: "Puerto Rico",
  },
}