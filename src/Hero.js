import 'regenerator-runtime/runtime'
import React, { useState, useEffect, useMemo } from 'react'

import { useStateCovidData, idToStateData } from './data/stateCovidDataService'
import { useTrendData } from './data/stateTrendDataService'
import { usePolicyData } from './data/policyDataService'

import USMap from './charts/USMap'
import StateTooltip from './StateTooltip'
import PolicyChart from './charts/PolicyChart'
import Modal from './layout/Modal'

import styles from './hero.modules.css'

const Hero = () => {
  const [stateData, isStateDataLoading] = useStateCovidData()
  const [trendData, isTrendDataLoading ] = useTrendData()
  const [policyData, isPolicyDataLoading ] = usePolicyData()

  const [hoverStateId, setHoverStateId] = useState(null)
  const hoverStateData = hoverStateId ? idToStateData(hoverStateId, stateData) : null

  const [focusedStateId, setFocusedStateId] = useState(8)

  const focusedData = useMemo(() => {
    if(isTrendDataLoading || isPolicyDataLoading || focusedStateId === null) {
      return null
    }

    const stateTrendData = trendData.filter( obj => obj.id == focusedStateId )[0]

    return {
      rollup: idToStateData(focusedStateId, stateData),
      casesRaw: stateTrendData.casesRaw,
      casesSpline: stateTrendData.casesSpline,
      positivitySpline: stateTrendData.positivitySpline,
      policy: policyData.filter( obj => obj.id == focusedStateId )[0]
    }
  }, [focusedStateId, isTrendDataLoading, isPolicyDataLoading])
  
  const [mousePosition, setMousePosition] = useState({x: null, y: null})
  const updateMousePosition = event => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }
  useEffect( () => {
    document.addEventListener('mousemove', updateMousePosition)
    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (<div className={styles.root}>
    { hoverStateData && 
      (<StateTooltip data={hoverStateData} x={mousePosition.x} y={mousePosition.y} />)} 

    {focusedData && (
      <Modal title={`Detail of ${focusedData.rollup.STATE}`} onClose={ () => setFocusedStateId(null) }>
        <PolicyChart 
          rawCasesSeries={focusedData.casesRaw}
          trendCasesSeries={focusedData.casesSpline}
          positivitySeries={focusedData.positivitySpline}
          policyData={focusedData.policy}
        />
      </Modal>
    )}

    
    { isStateDataLoading ? (
      <p>Loading state data</p>
    ):(
      <USMap data={stateData} setHoverStateId={setHoverStateId} setFocusedStateId={setFocusedStateId}/>
    )}
    
  </div>)
}
export default Hero;