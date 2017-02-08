import { connect } from 'react-redux'
import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import ReportsDisplay from '../../components/ReportsDisplay'

export const formatReport = report => {
  let parsedReport = []
  let keys = []
  if (report.config) {
    keys = Object.keys(report.config)
    keys.map( k => {
      parsedReport.push([k, report.config[k]])
      return true
    })
  }
  if (report.metricValues) {
    keys = Object.keys(report.metricValues)
    keys.map( k => {
      parsedReport.push( [report.metricValues[k].name, report.metricValues[k].val])
      return true
    })
  }
  if (report.notes) {
    parsedReport.push([report.notes])
  }
  return parsedReport
}

export const parseCSV = data => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  data.forEach( (arr, i) => {
    const dataString = arr.join(',')
    csvContent += i < data.length ? dataString + '\n' : dataString
  })
  return csvContent
}

const launchDownload = csvContent => {
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'test_data.csv')
  document.body.appendChild(link)
  link.click()
}

export const downloadQueued = (reports, queued) => {
  const dataStr = queued.map( q => {
    let data = formatReport(reports[q])
    return parseCSV(data)
  })
  launchDownload(dataStr)
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

const ExistingReports = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportsDisplay)

export default ExistingReports
