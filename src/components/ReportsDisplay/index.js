import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import ReportItem from '../../components/ReportItem'

const ReportsDisplay = ({ reports,
                          status,
                          queued,
                          downloadQueued,
                          queueReport,
                          unqueueReport,
                          clearQueue,}) => {

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

  if (status === 'received') {
    let keys = Object.keys(reports)
    keys = keys.sort( (a, b) => b - a )
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
  else if (status === 'errored') {
    return (
      <div className="existingReports">
        <h3>Report loading has failed, sorry!</h3>
      </div>
    )
  }
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

export default ReportsDisplay
