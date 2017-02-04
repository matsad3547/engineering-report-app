import React from 'react';
import { connect } from 'react-redux'

import { saveReport } from '../actions'
import { getReports } from '../actions/getReports'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import RaisedButton from 'material-ui/RaisedButton'

// import NewReportConfigMenu from './NewReportConfigMenu'
// import DropDownSliderInput from './DropDownSliderInput'
// import NoteField from './NoteField'
import database from './Firebase'

import ReportInterface from '../components/ReportInterface'

// const ReportInterface = ({  config,
//                             metricValues,
//                             notes,
//                             previousMetricValues,           submitReport }) => {
//
//   const keys = Object.keys(metricValues).sort( (a, b) => a - b)
//
//   console.log('config:', config,
//     'metric values:', metricValues,
//     'notes:', notes,
//     'previousMetricValues:', previousMetricValues,
//   );
//
//   const styles = {
//     button: {
//       height: 50,
//       margin: 12,
//     }
//   }
//
//   return (
//     <div className="reportInput">
//
//       <NewReportConfigMenu
//         newReportConfig={config}
//         />
//
//       <hr/>
//
//       {keys.map( (key, i) =>
//       <MuiThemeProvider
//         key={i + 'a'}>
//         <DropDownSliderInput
//         key={i + 'b'}
//         id={key}
//         name={metricValues[key].name}
//         value={metricValues[key].val}
//         previousVal={previousMetricValues[i] ? previousMetricValues[i] : 4.5}
//         />
//       </MuiThemeProvider>
//       )}
//       <NoteField
//         notes={notes}
//         />
//
//       <MuiThemeProvider>
//         <RaisedButton
//           label="Save Report"
//           style={styles.button}
//           className="reportButton"
//           onClick={submitReport}
//           />
//       </MuiThemeProvider>
//
//     </div>
//   )
// }

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.newReportConfig,
    metricValues: state.metricValues,
    notes: state.notes,
    previousMetricValues: state.previousMetricValues,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const { config, metricValues, notes } = ownProps

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
        config,
        metricValues,
        notes,
    }
    let updates = {}
    updates['test reports/' + newReportKey] = newReport
    database.ref().update(updates)
    const metricValArr = getMetricValArr()
    dispatch(
      saveReport(metricValArr),
      getReports('reports'),
    )
  }

  return {
    submitReport,
    }

}

const NewReport = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportInterface)

export default NewReport
