import { combineReducers } from 'redux'

const initVal = 4.5

const metricNames = ['Awesomeness', 'Coolness']
//
const getInitMetricState = metricNames => {
  let initMetricState = {}
  for (let i = 0; i < metricNames.length; i++) {
    let str = 'metricName' + (i + 1)
    Object.assign( initMetricState, {
      [str]: {
        name: metricNames[i],
        val: initVal,
      }
    })
  }
  return initMetricState
}

const initMetricState = getInitMetricState(metricNames)

// console.log('Object version:', initMetricState);

// {awesomeness:
//   val: initVal,
// }

//
// const initMetricState = {
//   metricName1: {
//     name: 'Awesomeness',
//     val: initVal,
//   },
//   metricName2: {
//     name: 'Coolness',
//     val: initVal,
//   },
// }

const getUnchangedState = (state, changedKey) => {
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
    case 'CHANGE_VAL':
    let unchangedState = getUnchangedState(state, action.id)
    // console.log('changed value:', action.val);
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

export const combinedReducers = combineReducers({
  metricValues
})
