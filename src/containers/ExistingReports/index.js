import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import ReportItem from '../../components/ReportItem'

const ExistingReports = ({ reports,
                          status,
                          queued,
                          downloadQueued,
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

export const formatReports = (reports, queued) => {
  let parsedReports = []
  let count = 0
  queued.forEach( (q, i) => {
    count = Object.keys(reports[q].config || {}).reduce((sum, c, j) => {
    if (i === 0) parsedReports.push([c])
    parsedReports[j].push(reports[q].config[c]);
    return sum + 1
  }, 0)

    if (reports[q].metricValues) {
      const mvKeys = Object.keys(reports[q].metricValues)
      mvKeys.forEach( (k, j) => {
        if (i === 0) parsedReports.push( [ reports[q].metricValues[k].name])
        parsedReports[j + count].push(reports[q].metricValues[k].val)
      })
    }

    if (reports[q].notes) {
      if (i === 0) parsedReports.push(['Notes'])
      parsedReports[parsedReports.length - 1].push(reports[q].notes)
    }
  })
  return parsedReports
}

export const parseCSV = data => (
  data.reduce( (sum, arr, i) => {
    return sum + (i < data.length ? arr.join(',') + '\n' : arr.join(',') )}, 'data:text/csv;charset=utf-8,')
  )

const launchDownload = csvContent => {
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'test_data.csv')
  document.body.appendChild(link)
  link.click()
}

export const downloadQueued = (reports, queued) => {
  const dataStr = formatReports(reports, queued)
  const data = parseCSV(dataStr)
  launchDownload(data)
}

const mapStateToProps = state => {
  return {
    reports: state.reports.reports,
    status: state.reports.status,
    queued: state.queued,
    downloadQueued: (reports, queued) => downloadQueued(reports, queued)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueReport: report => dispatch(queueReport(report)),
    unqueueReport: index => dispatch(unqueueReport(index)),
    clearQueue: () => dispatch(clearQueue())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ExistingReports)
