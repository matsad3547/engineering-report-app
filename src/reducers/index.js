import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const initVal = 5

const initReportConfig = {
  model: '',
  shortName: '',
  configNum: 1,
  ballast: 'No',
}

const initReports = {
  status: 'not requested',
  reports: [],
  error: '',
}

export const metricNames = [
  'Awesomeness',
  'Coolness',
  'Sweetness',
  'Desireablity',
  'Cheesiness',
  'Stuff',
  'Worthwhile',
  'Sleepy',
  'Words',
  'Chocolate',
  'Swiftness',
  'Leanness',
  'Blackness',
  'Whiteness',
  'Redness',
  'Brownness',
  'Blueness'
 ]

const initUserState = {
  email: '',
  password: '',
  verified: '',
}

const getInitMetricState = metricNames => {
  let initMetricState = {}
  metricNames.map( (name, i) => {
    Object.assign( initMetricState, {
      [i]: {
        name,
        val: initVal,
      }
    })
    return true
  })
  return initMetricState
}

export const initMetricState = getInitMetricState(metricNames)

const getMetricValArr = (metricValues) => {
  let metricValArr = []
  for (let key in metricValues) {
    if (metricValues.hasOwnProperty(key)){
      metricValArr[key] = metricValues[key].val
    }
  }
  return metricValArr
}

export const metricValues = (state = initMetricState, { type, id, name, val }) => {

  switch (type) {
    case 'CHANGE_METRIC_VAL':
    return { ...state,
              [id]: {
                      name,
                      val,
                    }
                  }

    case 'SAVE_REPORT_AND_RESET':
    return initMetricState
    default:
    return state
  }
}

export const notes = (state = '', { type, string }) => {
  switch (type) {
    case 'SAVE_REPORT_NOTES':
      return string
    case 'SAVE_REPORT_AND_RESET':
      return ''
    default:
    return state
  }
}

export const reportConfig = (state = initReportConfig, action) => {

  const { type, model, shortName, configNum, ballast } = action
  switch (type) {
    case 'SET_NEW_REPORT_CONFIG':
      return {
        model,
        shortName,
        configNum,
        ballast,
      }
    case 'SAVE_REPORT_AND_RESET':
      return initReportConfig
    default:
    return state
  }
}

export const previousMetricValues = (state = [], { type, output, reports }) => {
  switch (type) {
    case 'REPORTS_RECEIVED':
    const lastReportKey = Object.keys(reports).sort( (a, b) => b - a )[0]
      return getMetricValArr(reports[lastReportKey].metricValues)
    default:
      return state
  }
}

export const reports = (state = initReports, { type, reports, error }) => {
  switch (type) {
    case 'REPORTS_REQUESTED':
    return {
      status: 'requested',
    }
    case 'REPORTS_RECEIVED':
    return {
      status: 'received',
      reports,
    }
    case 'REPORTS_ERRORED':
    return {
      status: 'errored',
      error,
    }
    default:
    return state
  }
}

export const queued = (state = [], { type, report, index }) => {
  switch (type) {
    case 'QUEUE_REPORT':
      return [...state, report].sort( (a, b) => a - b )
    case 'UNQUEUE_REPORT':
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ].sort( (a, b) => a - b )
    case 'CLEAR_QUEUE':
      return []
    default:
    return state
  }
}

export const user = (state = initUserState, {type, firstName, lastName, email, password, verified }) => {
  switch (type) {
    case 'SET_USER_DATA':
      return {
        email,
        password,
        verified,
      }
    case 'CLEAR_USER_DATA':
      return initUserState
    default:
      return state
  }
}

export const combinedReducers = combineReducers({
  reportConfig,
  metricValues,
  notes,
  previousMetricValues,
  reports,
  queued,
  user,
  routing: routerReducer,
  })
