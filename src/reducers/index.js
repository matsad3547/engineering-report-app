import { combineReducers } from 'redux'

export const initVal = 5

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
    default:
    return state
  }
}

export const notes = (state = '', action) => {
  switch (action.type) {
    case 'SAVE_REPORT_NOTES':
      return action.string
    default:
    return state
  }
}

export const previousMetricValues = (state = [], action) => {
  return state
}

export const combinedReducers = combineReducers({
  metricValues,
  notes,
  previousMetricValues,
})

//
// export const combinedReducers = combineReducers({
//   newReportState,
//   previousMetricValues,
// })
