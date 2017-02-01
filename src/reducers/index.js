import { combineReducers } from 'redux'

export const initVal = 5

const initReportConfig = {
  model: '',
  shortName: '',
  configNum: 1,
  ballast: 'No',
}

const metricNames = [
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
//
const getInitMetricState = metricNames => {
  let initMetricState = {}
  metricNames.map( (name, i) => {
    let str = i + 1
    Object.assign( initMetricState, {
      [str]: {
        name,
        val: initVal,
      }
    })
    return true
  })
  return initMetricState
}

export const initMetricState = getInitMetricState(metricNames)

export const getUnchangedState = (state, changedKey) => {
  let unchangedState = {}
  for (let key in state) {
    if (state.hasOwnProperty(key)) {
      if (key !== changedKey ) {
        Object.assign(unchangedState, {[key]: state[key]})
      }
    }
  }
  return unchangedState
}

export const metricValues = (state = initMetricState, action) => {

  switch (action.type) {
    case 'CHANGE_METRIC_VAL':
    let unchangedState = getUnchangedState(state, action.id)
      return  Object.assign(unchangedState, {
          [action.id]: {
            name: action.name,
            val: action.val,
          }
      })
      case 'SAVE_REPORT_AND_RESET':
      return initMetricState
    default:
    return state
  }
}

export const notes = (state = '', action) => {
  switch (action.type) {
    case 'SAVE_REPORT_NOTES':
      return action.string
    case 'SAVE_REPORT_AND_RESET':
      console.log('received action at notes');
      return ''
    default:
    return state
  }
}

export const newReportConfig = (state = initReportConfig, action) => {

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

export const previousMetricValues = (state = [], action) => {
  return state
}

export const combinedReducers = combineReducers({
  newReportConfig,
  metricValues,
  notes,
  previousMetricValues,
})

//
// export const combinedReducers = combineReducers({
//   newReportState,
//   previousMetricValues,
// })
