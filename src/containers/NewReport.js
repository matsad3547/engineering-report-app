import React from 'react';
import { connect } from 'react-redux'
// import * as firebase from 'firebase'

import { saveReport } from '../actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import NewReportConfigMenu from './NewReportConfigMenu'
import DropDownSliderInput from './DropDownSliderInput'
import NoteField from './NoteField'
import fbRef from './Firebase'

let NewReport = ({  newReportConfig,
                    metricValues,
                    notes,
                    previousMetricValues,                   dispatch }) => {

  // const previousMetricValues = []

  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

  const getMetricValArr = () => {
    let metricValArr = []
    for (let key in metricValues) {
      if (metricValues.hasOwnProperty(key)){
        metricValArr[key] = metricValues[key].val
      }
    }
    return metricValArr
  }

  const submitReport = e => {
    e.preventDefault()
    const newReportKey = Date.now()
    const newReport = {
        config: newReportConfig,
        metricValues,
        notes,
    }
    let updates = {}
    updates['test reports/' + newReportKey] = newReport
    fbRef.update(updates)
    const metricValArr = getMetricValArr()
    dispatch(saveReport(metricValArr))
    // saveReportData()
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
        newReportConfig={newReportConfig}
        />

      <hr/>

      {keys.map( (key, i) =>
      <MuiThemeProvider
        key={i + 'a'}>
        <DropDownSliderInput
        key={i + 'b'}
        id={key}
        name={metricValues[key].name}
        value={metricValues[key].val}
        previousVal={previousMetricValues[i] ? previousMetricValues[i] : 4.5}
        />
      </MuiThemeProvider>
      )}
      <NoteField
        notes={notes}
        />

      <MuiThemeProvider>
        <RaisedButton
          label="Save Report"
          style={styles.button}
          className="reportButton"
          onClick={submitReport}
          />
      </MuiThemeProvider>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    newReportConfig: state.newReportConfig,
    metricValues: state.metricValues,
    notes: state.notes,
    previousMetricValues: state.previousMetricValues,
  }
}

NewReport = connect(
  mapStateToProps,
)(NewReport)

export default NewReport
