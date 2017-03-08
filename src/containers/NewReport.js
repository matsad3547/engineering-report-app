import { connect } from 'react-redux'
import { saveReport } from '../actions'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'
import ReportInterface from '../components/ReportInterface'

const mapStateToProps = state => {

  return {
    config: state.reportConfig,
    metricValues: state.metricValues,
    notes: state.notes,
    previousMetricValues: state.previousMetricValues,
    authState: state.authState,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    saveReport: () => dispatch(saveReport()),
    getReports: (dataset) => dispatch(getReports(dataset)),
    getKeywords: (dataset) => dispatch(getKeywords(dataset)),
    }
}

const NewReport = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportInterface)

export default NewReport
