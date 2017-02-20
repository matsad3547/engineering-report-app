import { connect } from 'react-redux'
// import { selectDataset } from '../utilities/auth'
import { saveReport } from '../actions'
import { getReports } from '../actions/getReports'
import ReportInterface from '../components/ReportInterface'

// const dataset = selectDataset()

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    config: state.reportConfig,
    metricValues: state.metricValues,
    notes: state.notes,
    previousMetricValues: state.previousMetricValues,

  }
}

const mapDispatchToProps = dispatch => {

  return {
    saveReport: () => dispatch(saveReport()),
    getReports: (dataset) => dispatch(getReports(dataset)),
    }
}

const NewReport = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportInterface)

export default NewReport
