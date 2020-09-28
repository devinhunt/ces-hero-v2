import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { geoPath } from 'd3'
import { feature, mesh } from 'topojson'

import { getUsMapData } from '../data/usAtlasService'
import { scoreToColor } from '../data/colors'
import { idToStateData } from '../data/stateCovidDataService'

import DataLoading from '../components/DataLoading'
import LabelAnnotation from './LabelAnnotation'

import styles from '../hero.modules.css'

const USMap = ({data, setHoverStateId, setFocusedStateId}) => {
  const [mapData, setMapData] = useState({})
  const [localHoverId, setLocalHoverId] = useState(null)
  const [isMapDataLoading, setIsMapDataLoading] = useState(true)

  useEffect( () => {
    const getMapData = async () => {
      const result = await getUsMapData()
      setMapData(result)
      setIsMapDataLoading(false)
    }
    getMapData()
  }, [])

  useMemo( () => {
    setHoverStateId(localHoverId)
  }, [localHoverId])

  const renderMap = () => {
    const line = geoPath()

    // us states please
    const states = feature(mapData, mapData.objects.states)

    const idToColor = id => scoreToColor[idToStateData(id, data)['GATING SCORE']]

    // map in centroids
    const gp = geoPath()
    states.features.forEach( state => {
      const [x, y] = gp.centroid(state)
      state.properties = { ...state.properties, x, y}
    })

    // DC
    const stateDC = states.features.filter( state => state.id == 11 )[0]

    return (
      <g onMouseLeave={() => setLocalHoverId(null)}>
        <g>
          {states.features.map( state => (
            <path 
              className={ styles.USMapState }
              key={ state.id }
              onClick= { () => setFocusedStateId(state.id) }
              onMouseEnter={ () => setLocalHoverId(state.id) }
              fill={ idToColor(state.id) }
              d={ line(state) } 
            />
          ))}
        </g>
        <g>
          <path 
            d={ line(mesh(mapData, mapData.objects.states, (a, b) => a !== b))} 
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </g>

        <g 
          onClick= { () => setFocusedStateId(11) }
          onMouseEnter={ () => setLocalHoverId(11) }
          style={{cursor: "pointer"}}
        >
          <LabelAnnotation 
            text="DC"
            from={ [stateDC.properties.x + 2, stateDC.properties.y + 2] }
            to= { [stateDC.properties.x + 100, stateDC.properties.y + 100] }
          />
        </g>
      </g>
    )
  }

  return (
    <svg viewBox="-50 0 1050 700">
      {isMapDataLoading ? (
        <DataLoading />
      ) : (
        renderMap()
      )}
    </svg>
  )
}

export default USMap