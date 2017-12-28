import {
  initVal,
  configOrder,
} from '../config/'

export const date = unixDate => new Date(parseInt(unixDate, 0))
                                  .toString()
                                  .slice(0, 24)

const getWeatherString = weather => weather ?
  `"="${JSON.stringify(weather)}""`
    .replace(/("{|}")/gi,'"') : ''

export const formatReports = (reports, queued) => {

  const parsedObj = queued.reduce( (obj, n, i) => {
    Object.keys(reports[n].config)
      .forEach( c => {
        if(obj[c]) {
          obj[c].push(reports[n].config[c])
        }
        else {
          obj[c] = [reports[n].config[c]]
        }
        console.log(obj, c);
    })
    Object.keys(reports[n].metricValues)
      .forEach( t => {
        const mv = reports[n].metricValues[t]
        if(obj[mv.name]) {
          obj[mv.name].push(mv.val)
        }
        else {
          obj[mv.name] = [mv.val]
        }
    })
    if (obj.notes) {
      obj.notes.push(reports[n].notes)
    }
    else {
      obj.notes = [reports[n].notes]
    }
    if (obj.weather) {
      obj.weather.push(getWeatherString(reports[n].weather))
    }
    else {
      obj.weather = [getWeatherString(reports[n].weather)]
    }

    console.log(obj);
    return obj
  }, {})

  return Object.keys(parsedObj)
          .map( k => [k, ...parsedObj[k]] )
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
