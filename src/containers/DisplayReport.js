import { connect } from 'react-redux'
import ReportDisplayForm from '../components/ReportDisplayForm'

const mapStateToProps = (state, ownProps) => {

  const report = ownProps.params.report

  if (state.reports.status === 'received') {

    const reportVals = state.reports.reports[report]

    return {
      report,
      config: reportVals.config,
      metricValues: reportVals.metricValues,
      notes: reportVals.notes,
    }
  }

  return {}

}

const DisplayReport = connect(mapStateToProps)(ReportDisplayForm)

export default DisplayReport
