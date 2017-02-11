import { connect } from 'react-redux'
import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import ReportsDisplay from '../../components/ReportsDisplay'

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

export const parseCSV = data => {
  const csvContent = data.reduce( (sum, arr, i) => {
    return sum + (i < data.length ? arr.join(',') + '\n' : arr.join(',') )}, 'data:text/csv;charset=utf-8,')
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

const ExistingReports = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ReportsDisplay)

export default ExistingReports
