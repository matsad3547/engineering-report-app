import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import ReportItem from '../../components/ReportItem'
import { downloadQueued } from '../../utils/'

const ExistingReports = ({  reports,
                            status,
                            queued,
                            loading,
                            error,
                            queueReport,
                            unqueueReport,
                            clearQueue,
                          }) => {

  const firstReport = 0
  const lastReport = 10

  const download = e => {
    e.preventDefault()
    downloadQueued(reports, queued)
    clearQueue()
  }

  const styles = {
    button: {
      height: 50,
      width: 250,
      margin: 10,
    },
    spinner: {
      size: 75,
      thickness: 6,
    }
  }

  if (loading) {
    return (
      <div className="existingReports">
        <h3>Reports are loading...</h3>
        <CircularProgress
          className="spinner"
          thickness={styles.spinner.thickness}
          size={styles.spinner.size}
          />
      </div>
    )
  }
  else if (error.reportErr) {
    return (
      <div className="existingReports">
        <h3>Report loading has failed, sorry!</h3>
      </div>
    )
  }
  else {
    const keys = Object.keys(reports)
                  .sort( (a, b) => b - a )
    const selectedKeys = keys.slice(firstReport, lastReport)

    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        <div className="reportList">
          {selectedKeys.map( (k, i) =>
            <ReportItem
              key={i}
              config={reports[k].config}
              report={k}
              index={i}
              queued={queued}
              queueReport={queueReport}
              unqueueReport={unqueueReport}
              />)}
            </div>

            <RaisedButton
              label="download"
              style={styles.button}
              onClick={download}
              />
          </div>
    )
  }
}

const mapStateToProps = state => {

  const { reports, queued, data } = state

  return {
    reports: reports.reports,
    queued,
    loading: data.loading,
    error: data.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueReport: report => dispatch(queueReport(report)),
    unqueueReport: index => dispatch(unqueueReport(index)),
    clearQueue: () => dispatch(clearQueue()),
    // getReports: () => dispatch(getReports()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ExistingReports)
