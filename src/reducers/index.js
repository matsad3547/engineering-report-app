import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import {
  initReportConfig,
  initReports,
  initUserState,
  initDataState,
  initTeamState,
} from '../config/'

import {
  getInitMetricState,
  resetMetricState,
} from '../utils/'

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

export const previousMetricValues = (state = [], action) => {
  const { type } = action
  switch (true) {
    case type === 'REPORTS_RECEIVED':
    const { reports } = action
    if (reports){
      const lastReportKey = Object.keys(reports)
      .map( k => parseInt(k, 10) )
      .sort( (a, b) => b - a )[0]

      return Object.keys(reports[lastReportKey].metricValues)
      .map( k => reports[lastReportKey].metricValues[k].val)
    }
    else return state

    default:
      return state
  }
}

export const reports = (state = initReports, { type, reports, n, allReports }) => {
  switch (type) {
    case 'REPORTS_RECEIVED':
    return {
      n,
      reports,
      allReports,
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
                  .filter( k => k !== 'type' )
      return {
        ...state,
        [key]: action[key],
      }
    case 'CLEAR_USER_DATA':
      return {
        ...state,
        displayName: '',
        email: '',
        uid: null,
        password: '',
        verifyPassword: '',
        admin: false,
        approved: false,
        team: 'demo',
      }

    case 'RESET_LOGIN':
      return {
        ...state,
        password: '',
        verifyPassword: '',
      }
      
    default:
      return state
  }
}

export const data = (state = initDataState, action) => {
  const key = Object.keys(action)
                .filter( k => k !== 'type' )[0]
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

export const teamConfig = (state = initTeamState, action) => {
  const key = Object.keys(action)
                .filter( k => k !== 'type' )[0]
  switch(action.type){
    case 'SET_TEAM_PROPERTY':
      return {
        ...state,
        [key]: action[key],
      }

    case 'SET_TEAM_KEYWORD':

      if(state.keywords.includes(action.keyword)){
        const index = state.keywords.indexOf(action.keyword)
        return {
          ...state,
          keywords: [
            ...state.keywords.slice(0, index),
            ...state.keywords.slice(index + 1),
          ]
        }
      }
      else {
        return {
          ...state,
          keywords: [
            action.keyword,
            ...state.keywords,
          ],
        }
      }

    case 'KEYWORDS_RECEIVED':
      return {
        ...state,
        keywords: action.keywords,
      }

    case 'CLEAR_USER_DATA':
      return initTeamState

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
    teamConfig,
    routing: routerReducer,
  })
