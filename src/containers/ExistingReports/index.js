import { connect } from 'react-redux'
import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import ReportsDisplay from '../../components/ReportsDisplay'

export const formatReports = (reports, queued) => {
  let parsedReport = []
  let count = 0
  queued.forEach( (q, i) => {
    if (reports[q].config) {
      const configKeys = Object.keys(reports[q].config)
      configKeys.forEach( (c, j) => {
        i === 0 ? (parsedReport.push( [c, reports[q].config[c] ])) :
         (parsedReport[j].push(reports[q].config[c]))
      })
      count = configKeys.length
    }

    if (reports[q].metricValues) {
      const mvKeys = Object.keys(reports[q].metricValues)
      mvKeys.forEach( (k, j) => {
        i === 0 ?
        (parsedReport.push( [ reports[q].metricValues[k].name, reports[q].metricValues[k].val ])) :
         (parsedReport[j + count].push(reports[q].metricValues[k].val))
      })
    }

    if (reports[q].notes) {
      i === 0 ?
      (parsedReport.push(['Notes', reports[q].notes])) :
      (parsedReport[parsedReport.length - 1].push(reports[q].notes))
    }
  })

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
