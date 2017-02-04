import React from 'react';
// import { connect } from 'react-redux'

// import { saveReport } from '../actions'
// import { getReports } from '../actions/getReports'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

import NewReportConfigMenu from '../containers/NewReportConfigMenu'
import DropDownSliderInput from '../containers/DropDownSliderInput'
import NoteField from '../containers/NoteField'
// import database from './Firebase'

const ReportInterface = ({  config,
                            metricValues,
                            notes,
                            previousMetricValues,           submitReport }) => {

  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

  console.log('config:', config,
    'metric values:', metricValues,
    'notes:', notes,
    'previousMetricValues:', previousMetricValues,
  );

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

  return (
    <div className="reportInput">

      <NewReportConfigMenu
        newReportConfig={config}
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

export default ReportInterface
