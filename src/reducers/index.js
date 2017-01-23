import { combineReducers } from 'redux'

const initVal = 4.5

const initState = {
  metricName1: {
    name: 'Metric Name 1',
    val: initVal,
  },
  metricName2: {
    name: 'Metric Name 2',
    val: initVal,
  },
}

export const metricValues = (state = initState, input) => {
  if (input) {
    // console.log('the input to metricValues is:', input);
  }
  return state
}

export const combinedReducers = combineReducers({
  metricValues
})
