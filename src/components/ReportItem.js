import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import { date } from '../utils/'

const ReportItem = ({ report,
                      timeStamp,
                      index,
                      queued,
                      displayName,
                      admin,
                      teammates,
                      queueReport,
                      unqueueReport,
                    }) => {

  const {
    model,
    shortName,
    configNum,
  } = report.config

  const checked = queued.includes(timeStamp)

  const onCheck = (e, i) => {
    e.preventDefault()
    if (checked) {
      const index = queued.indexOf(timeStamp)
      unqueueReport(index)
    }
    else queueReport(timeStamp)
  }

  const styles = {
    button: {
      height: 25,
      width: 125,
    },
    checkbox: {
      marginBottom: 5,
    },
    label: {
      color: 'white',
    },
    checked: {
      fill: 'white'
    },
  }

  const uid = report.uid

  return (
    <div className="reportItem">
      <p>{`${index + 1}. `}{model || '<model>'} - Configuration {configNum || '<#>'}</p>
      <p>Desc: {shortName || '<description>'}</p>
      {admin ? <p>Author: {teammates ? teammates[uid].displayName : displayName }</p> : ''}
      <p>{date(timeStamp)}</p>

      <Checkbox
        label="Select to Download"
        labelStyle={styles.label}
        style={styles.checkbox}
        iconStyle={!checked ? styles.checked : styles.unchecked}
        checked={checked}
        onCheck={onCheck}
        />
      <div className="download">
      </div>
      <RaisedButton
        containerElement={<Link to={`/app/existing_reports/${timeStamp}`}/>}
        label="View Report"
        style={styles.button}
        className="reportButton"
        />
    </div>
  )
}

ReportItem.propTypes = {
  report: PropTypes.object,
  timeStamp: PropTypes.number,
  index: PropTypes.number,
  queued: PropTypes.array,
  admin: PropTypes.bool,
  teammates: PropTypes.object,
  queueReport: PropTypes.func,
  unqueueReport: PropTypes.func,
}

export default ReportItem
