import 'regenerator-runtime/runtime'
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react'

import { useStateCovidData, idToStateData } from './data/stateCovidDataService'
import { useTrendData } from './data/stateTrendDataService'
import { usePolicyData } from './data/policyDataService'

import USMap from './charts/USMap'
import StateTooltip from './components/StateTooltip'
import PolicyChart from './charts/PolicyChart'
import Modal from './layout/Modal'
import DataLoading from './components/DataLoading'

import styles from './hero.modules.css'

const Hero = () => {
  const [stateData, isStateDataLoading] = useStateCovidData()
  const [trendData, isTrendDataLoading ] = useTrendData()
  const [policyData, isPolicyDataLoading ] = usePolicyData()

  const [hoverStateId, setHoverStateId] = useState(null)
  const hoverStateData = hoverStateId ? idToStateData(hoverStateId, stateData) : null

  const [focusedStateId, setFocusedStateId] = useState(null)

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

  // Metrics for sizing various things
  const heroRef = useRef()
  const [metrics, setMetrics] = useState({})
  useLayoutEffect( () => {
    setMetrics(heroRef.current.getBoundingClientRect().toJSON())
  }, [heroRef.current] )

  useEffect( () => {
    const onResize = () => {
      setMetrics(heroRef.current.getBoundingClientRect().toJSON())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [heroRef])

  return (<div className={styles.root} ref={heroRef}>
    {(hoverStateData && focusedData == null) && (
      <StateTooltip 
        data={hoverStateData} 
        x={mousePosition.x} 
        y={mousePosition.y}
        xRange={[metrics.left, metrics.right]} 
      />
    )} 

    {focusedData && (
      <Modal 
        title={`History of cases in ${focusedData.rollup.STATE}`} 
        onClose={ () => setFocusedStateId(null) }
      >
        <PolicyChart 
          rawCasesSeries={focusedData.casesRaw}
          trendCasesSeries={focusedData.casesSpline}
          positivitySeries={focusedData.positivitySpline}
          policyData={focusedData.policy}
        />
      </Modal>
    )}

    
    { isStateDataLoading || isTrendDataLoading ? (
      <DataLoading />
    ):(
      <USMap data={stateData} setHoverStateId={setHoverStateId} setFocusedStateId={setFocusedStateId}/>
    )}
    
  </div>)
}
export default Hero;