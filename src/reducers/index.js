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

const initUserState = {
  team: '',
  displayName: '',
  email: '',
  uid: null,
  password: '',
  verifyPassword: '',
  admin: false,
  approved: false,
  teams: [],
}

const initDataState = {
  loading: false,
  loaded: false,
  error: {},
}

const getInitMetricState = keywords => keywords.reduce( (obj, k, i) => ({
  ...obj,
  [i]: {
    name: k,
    val: initVal,
  }
}), {})

export const resetMetricState = state => Object.keys(state).reduce( (obj, k) => ({
    ...obj,
    [k]: {
      name: state[k].name,
      val: initVal,
    }
  }), {})

export const metricValues = (state = {}, { type, id, name, val, keywords }) => {

  switch (type) {
    case 'KEYWORDS_RECEIVED':
    return getInitMetricState(keywords)

    case 'CHANGE_METRIC_VAL':
    return { ...state,
              [id]: {
                      name,
                      val,
                    }
                  }
    case 'SAVE_REPORT_AND_RESET':
    return resetMetricState(state)
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

  const { type,
          model,
          shortName,
          configNum,
          ballast
        } = action

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
    const lastReportKey = Object.keys(reports)
                            .sort( (a, b) => b - a )[0]
      return Object.keys(reports[lastReportKey].metricValues)
        .map( k => reports[lastReportKey].metricValues[k].val)
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

export const user = (state = initUserState, action) => {
  const  {  type,
            team,
            displayName,
            email,
            uid,
            admin,
            approved,
          } = action
  switch (type) {
    case 'SET_USER_DATA':

      return {
        ...state,
        team,
        displayName,
        email,
        uid,
        admin,
        approved,
      }
    case 'SET_USER_PROPERTY':
    const key = Object.keys(action)
                  .filter( k => k !== 'type')
      return {
        ...state,
        [key]: action[key],
      }
    case 'CLEAR_USER_DATA':
      return {
        ...state,
        team: '',
        displayName: '',
        email: '',
        uid: null,
        password: '',
        verifyPassword: '',
        admin: false,
        approved: false,
      }
    default:
      return state
  }
}

export const data = (state = initDataState, action) => {
  const key = Object.keys(action)
                .filter( k => k !== 'type')[0]
  switch (action.type) {
    case 'SET_DATA_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [key]: action[key],
        }
      }
    case 'SET_DATA_PROPERTY':
      return {
        ...state,
        [key]: action[key]
      }
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
    data,
    routing: routerReducer,
  })
