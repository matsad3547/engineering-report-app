import React from 'react';
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import NewReportConfigMenu from './NewReportConfigMenu'
import DropDownSliderInput from './DropDownSliderInput'
import NoteField from './NoteField'

let NewReport = state => {

  const newReportConfig = state.newReportConfig
  const metricValues = state.metricValues
  const notes = state.notes

  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

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
          />
      </MuiThemeProvider>

    </div>
  )
}

NewReport = connect(state => state)(NewReport)

export default NewReport
