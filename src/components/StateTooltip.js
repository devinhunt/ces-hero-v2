import React from 'react'

import SparkLine from '../charts/SparkLine'
import LabeledDataFrame from './LabeledDataFrame'
import Title from './Title'
import { Row, Col } from './Grid'

import { scoreToLabel, scoreToColor } from '../data/constants'
import styles from '../hero.modules.css'

const StateTooltip = ({ data, x = 0, y = 0, width = 380, xRange = null }) => {

  const _d = key => data[key]

  let xScreen = x

  if(xRange) {
    xScreen = Math.min(Math.max(x, width / 2 + xRange[0]), xRange[1] - width / 2) 
  }

  const elementStyles = {
    left: `${ xScreen }px`,
    top: `${ y + 10 }px`,
    width: `${ width }px`
  }

  const titleStyle = {
    fontWeight: 'bold',
    padding: '0 0 5px 0'
  }

  const headerStyle = {
    marginBottom: '9px',
    borderBottom: '1px solid #eee'
  }
  
  return (
    <div className={styles.StateTooltip} style={elementStyles}>
      <div style={headerStyle}>
        <Row>
          <Col>
            <div style={titleStyle}>{_d('STATE')}</div>
          </Col>
          <Col>
            <div style={{fontSize: '10px', color: '#aaa', textAlign: 'right', lineHeight: '20px'}}>Tap for details</div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <LabeledDataFrame 
            label="Status"
            data={<div style={{fontWeight: 'bold', color: scoreToColor[_d('GATING SCORE')]}}>{scoreToLabel[_d('GATING SCORE')]}</div>}
          />
        </Col>
        <Col>
          <LabeledDataFrame 
            label="New cases per million"
            data={<div style={{fontWeight: 'bold', color: scoreToColor[_d('GATING SCORE')]}}>{_d('NEW CASES PER MILLION PER DAY')}</div>}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <LabeledDataFrame 
            label="Last 14 days of COVID+" 
            data={<SparkLine data={ _d('trend_cases') } width="160" height="35" labelFormat=".3~s" />} 
          />
        </Col>
        <Col>
          <LabeledDataFrame 
            label="Last 14 days positivity" 
            data={<SparkLine data={ _d('trend_positivity') } width="160" height="35" labelFormat=".1%" />} 
          />
        </Col>
      </Row>
    </div>
  )
}

export default StateTooltip