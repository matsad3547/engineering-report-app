import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import ReportItem from '../../components/ReportItem'
import { queueReport, unqueueReport } from '../../actions/'

const parseCSV = data => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  data.forEach( (arr, i) => {
    const dataString = arr.join(',')
    csvContent += i < data.length ? dataString + '\n' : dataString
  })
  return csvContent
}

const launchDownload = data => {
  const csvContent = parseCSV(data)
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'test_data.csv')
  document.body.appendChild(link)
  link.click()
}

const ReportsDisplay = ({ reports,
                          status,
                          queued,
                          queueReport,
                          unqueueReport, }) => {

  const firstReport = 0
  const lastReport = 10

  const download = e => {
    e.preventDefault()
    const data = [['test1','test2', 'stuff'], ['things', 'stuff', 'poop']]
    launchDownload(data)

  }

  const styles = {
    button: {
      height: 50,
      width: 250,
      margin: 10,
    },
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
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reports: state.reports.reports,
    status: state.reports.status,
    queued: state.queued,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueReport: report => dispatch(queueReport(report)),
    unqueueReport: index => dispatch(unqueueReport(index)),
  }
}

const ExistingReports = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportsDisplay)

export default ExistingReports
