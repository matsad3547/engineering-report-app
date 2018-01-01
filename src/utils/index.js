import { initVal } from '../config/'

export const date = unixDate => new Date(parseInt(unixDate, 0))
                                  .toString()
                                  .slice(0, 24)

const getWeatherString = weather => weather ? `"=""${JSON.stringify(weather)
    .replace(/({|}|")/gi,'')}"""` : ''

const parseConfigObj = (configObj, parsedObj, i) => {
  return Object.keys(configObj)
    .forEach( c => {
      parsedObj[c] ? parsedObj[c] = {
        ...parsedObj[c],
        [i]: configObj[c],
      } : parsedObj[c] = {
        [i]: configObj[c],
      }
  })
}

const parseMVObj = (mvObj, parsedObj, i) => {
  return Object.keys(mvObj)
    .forEach( t => {
      const mv = mvObj[t]
      parsedObj[mv.name] ? parsedObj[mv.name] = {
        ...parsedObj[mv.name],
        [i]: mv.val,
      } : parsedObj[mv.name] = {
        [i]: mv.val
      }
  })
}

export const formatReports = (reports, queued) => {

  const parsedObj = queued.reduce( (obj, n, i) => {

    parseConfigObj(reports[n].config, obj, i)

    parseMVObj(reports[n].metricValues, obj, i)

    //parse notes
    obj.notes ? obj.notes = {
      ...obj.notes,
      [i]: reports[n].notes,
    } : obj.notes = {
      [i]: reports[n].notes,
    }

    //parse weather
    obj.weather ? obj.weather = {
      ...obj.weather,
      [i]: getWeatherString(reports[n].weather)
    } : obj.weather = {
      [i]:  getWeatherString(reports[n].weather)
    }

    obj.count ? obj.count = [...obj.count, i] : obj.count = [i]

    return obj
  }, {})

  return Object.keys(parsedObj)
          .filter( k => k !== 'count')
          .sort( (a, b) => {
            const sortArr = ['notes', 'weather']
            return sortArr.indexOf(a) > sortArr.indexOf(b) ? 1 : 0
          })
          .map( k => parsedObj.count.reduce( (arr, n) =>
            parsedObj[k][n] ?
            [
              ...arr,
               parsedObj[k][n],
            ] : [
              ...arr,
              'n/a',
            ], [k])
          )
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

export const arrEqualsArr = (arr1, arr2) => {
  return !arr1.map( a => arr2.indexOf(a) ===
    arr1.indexOf(a)).includes(false)
      && !arr2.map( a => arr1.indexOf(a) ===
    arr2.indexOf(a) ).includes(false)
}
