import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'

import NewReportConfigMenu from '../containers/NewReportConfigMenu'
import DropDownSliderInput from '../containers/DropDownSliderInput'
import NoteField from '../containers/NoteField'

import database from '../utilities/firebase'


const ReportInterface = ({  config,
                            metricValues,
                            notes,
                            previousMetricValues,
                            saveReport,
                            getReports }) => {

  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

  const submitReport = e => {

    e.preventDefault()
    const newReportKey = Date.now()
    const newReport = {
      config,
      metricValues,
      notes,
    }
    let updates = {}
    updates[`test reports/${newReportKey}`] = newReport
    database.ref().update(updates)
    saveReport()
    getReports()
  }

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

  return (
    <div className="reportInput">

      <NewReportConfigMenu
        config={config}
        />

      <hr/>

      {keys.map( (key, i) =>

        <DropDownSliderInput
        key={i + 'b'}
        id={key}
        name={metricValues[key].name}
        value={metricValues[key].val}
        previousVal={previousMetricValues[i] ? previousMetricValues[i] : 4.5}
        />

      )}
      <NoteField
        notes={notes}
        />

      <RaisedButton
        label="Save Report"
        style={styles.button}
        className="reportButton"
        onClick={submitReport}
        />

    </div>
  )
}

export default ReportInterface
