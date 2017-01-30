import {
  initMetricState,
  getUnchangedState,
  metricValues,
  notes,
  newReportConfig,
} from './index.js'

const action = {
    type: 'TEST_REDUCER'
  }

let state = {}

test('inital metric state is an object', () => {
  expect(typeof(initMetricState)).toBe('object')
})

test('getUnchangedState() should edit an object to return the rest of the object minus the specified property', () => {
  let test = {
    initState: {
      1: {
        b: 'b',
      },
      2: {
        c: 'c',
      },
    },
    changedKey: '2',
    unchangedState: {
      1: {
        b: 'b',
      },
    }
  }

  expect(getUnchangedState(test.initState, test.changedKey )).toEqual(test.unchangedState)
})

test('metricValues() should return an object', () => {
  expect(typeof(metricValues({}, action))).toBe('object')
})

test('metricValues() should return initMetricState given initial empty inputs', () => {
  expect(metricValues(undefined, action)).toBe(initMetricState)
})

test('metricValues() should return a state with an object composed of components of the action', () => {
  let action = {
    type: 'CHANGE_METRIC_VAL',
    id: 1,
    val: 1,
    name: 'name',
  }
  let newState = Object.assign (getUnchangedState(initMetricState, action.id),   {
      1: {
        name: 'name',
        val: 1,
      }
    })

  expect(metricValues(undefined, action)).toEqual(newState)
})

test('notes() should return a empty string by default', () => {
  expect(notes(undefined, 'TEST')).toBe('')
})

test('notes() should return a string provided by the action', () => {
  let action = {
    type: 'SAVE_REPORT_NOTES',
    string: 'This is a test of the notes() reducer function'
  }
  expect(notes(undefined, action)).toBe(action.string)
})

test('newReportConfig() should return an object', () => {
  expect(typeof(newReportConfig(undefined, 'TEST'))).toBe('object')
})

test ('newReportConfig() should return an object with model, short name, config number, and ballast when given a action type of "SET_NEW_REPORT_CONFIG"', () => {
  let action = {
    type: 'SET_NEW_REPORT_CONFIG',
    model: 'string',
    shortName: 'string',
    configNum: 1,
    ballast: false,
  }
  let output = {
    model: 'string',
    shortName: 'string',
    configNum: 1,
    ballast: false,
  }
  expect(newReportConfig({}, action)).toEqual(output)
})
