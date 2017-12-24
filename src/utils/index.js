import {
  initVal,
} from '../config/'

export const date = unixDate => new Date(parseInt(unixDate, 0))
                                  .toString()
                                  .slice(0, 24)

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
  data.reduce( (sum, arr, i) => sum + (i < data.length ? arr.join(',') + '\n' : arr.join(',') ), 'data:text/csv;charset=utf-8,')
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

export const getInitMetricState = keywords => keywords.reduce( (obj, k, i) => ({
  ...obj,
  [i]: {
    name: k,
    val: initVal,
  }
}), {})

export const resetMetricState = state => Object.keys(state)
  .reduce( (obj, k) => ({
      ...obj,
      [k]: {
        name: state[k].name,
        val: initVal,
      }
    }), {})
