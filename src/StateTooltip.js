import React from 'react'

import SparkLine from './charts/SparkLine'
import LabeledDataFrame from './components/LabeledDataFrame'
import Title from './components/Title'
import { Row, Col } from './components/Grid'

import { scoreToLabel, scoreToColor } from './data/constants'
import styles from './hero.modules.css'

const StateTooltip = ({ data, x = 0, y = 0 }) => {

  const _d = key => data[key]

  const elementStyles = {
    left: `${x + 10}px`,
    top: `${y + 10}px`,
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