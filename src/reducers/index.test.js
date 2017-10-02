import {
  metricNames,
  initMetricState,
  getUnchangedState,
  metricValues,
  notes,
  reportConfig,
  previousMetricValues,
  reports,
  queued,
  user,
  authState,
  resetMetricState,
  data,
      } from './index.js'

const action = {
    type: 'TEST_REDUCER'
  }

let state = {}

describe('metricValues() ', () => {

  test('should return an object', () => {
    expect(typeof(metricValues({}, action))).toBe('object')
  })

  test('should return a state with an object composed of components of the action', () => {

    let action = {
      type: 'CHANGE_METRIC_VAL',
      id: 1,
      val: 1,
      name: 'name',
    }

    let oldState = {
      0: {
        name: 'stuff',
        val: 6,
      },
      1: {
        name: 'name',
        val: 9,
      }
    }

    let newState = {
      0: {
        name: 'stuff',
        val: 6,
      },
      1: {
        name: 'name',
        val: 1, //changed
      }
    }

    expect(metricValues(oldState, action)).toEqual(newState)
  })
})

describe('notes() ', () => {

  test('should return a empty string by default', () => {
    expect(notes(undefined, 'TEST')).toBe('')
  })

  test('should return a string provided by the action', () => {
    let action = {
      type: 'SAVE_REPORT_NOTES',
      string: 'This is a test of the notes() reducer function'
    }
    expect(notes(undefined, action)).toBe(action.string)
  })
})

describe('reportConfig() ', () => {

  test('should return an object', () => {
    expect(typeof(reportConfig(undefined, 'TEST'))).toBe('object')
  })

  test ('should return an object with model, short name, config number, and ballast when given a action type of "SET_NEW_REPORT_CONFIG"', () => {
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
    expect(reportConfig({}, action)).toEqual(output)
  })
})

describe('previousMetricValues() ', () => {

  test('should return an array', () => {
    const actual = Array.isArray(previousMetricValues(undefined, 'TEST'))
    const expected = true
    expect(actual).toEqual(expected)
  })

  test('should return an empty array by default', () => {
    const actual = previousMetricValues(undefined, 'TEST').length
    const expected = 0
    expect(actual).toBe(expected)
  })

  test('should return an array of values in the same order they are found in the `metricValues` array of the most recent report in response to the action type "REPORTS_RECEIVED"', () => {
    const reports = {
      233: {
        metricValues: []
      },
      234: {
        metricValues: [
          {
            name: 'a',
            val: 2,
          },
          {
            name: 'b',
            val: 4,
          },
          {
            name: 'c',
            val: 6,
          },
        ]
      }
    }

    const state = [1, 3, 5,]
    const action = {
      type: 'REPORTS_RECEIVED',
      reports,
    }
    const actual = previousMetricValues(state, action)
    const expected = [2, 4, 6,]
  })
})

describe('reports() ', () => {

  test('should return an object by default', () => {
    expect(typeof(reports(undefined, 'test'))).toBe('object')
  })

  test('should return a status of "requested" given an action type of "REPORTS_REQUESTED"', () => {

    const action = { type: 'REPORTS_REQUESTED' }

    expect(reports(undefined, action).status).toBe('requested')
  })

  test('should return a status of "received" given an action type of "REPORTS_RECEIVED"', () => {

    const action = { type: 'REPORTS_RECEIVED' }

    expect(reports(undefined, action).status).toBe('received')
  })

  test('should return reports passed in as a parameter an action type of "REPORTS_RECEIVED"', () => {

    const action = {
      type: 'REPORTS_RECEIVED',
      reports: ['test'],
    }

    expect(reports(undefined, action).reports).toEqual(['test'])
  })

  test('should return an error passed in as a parameter an action type of "REPORT_ERRORED"', () => {

    const action = {
      type: 'REPORTS_ERRORED',
      error: 'test error',
    }

    expect(reports(undefined, action).error).toEqual(
    'test error')
  })

  test('should return an status of "erroed" passed when passed an action type of "REPORTS_ERRORED"', () => {

    const action = {
      type: 'REPORTS_ERRORED',
      error: 'test error',
    }

    expect(reports(undefined, action).status).toEqual(
    'errored')
  })

})

describe('queued() ', () => {

  test('should return an array by default', () => {
    expect(queued(undefined, action)).toEqual([])
  })

  test('should return an array that includes a report value passed in when passing a type of "QUEUE_REPORT"', () => {
    const action = {
      type: 'QUEUE_REPORT',
      report: 12345,
    }
    expect(queued(undefined, action)).toEqual(expect.arrayContaining([ 12345 ]))
  })

  test('should return an array with a report corresponding to an index removed when passing a type of "UNQUEUE_REPORT"', () => {
    const action = {
      type: 'UNQUEUE_REPORT',
      index: 1,
    }
    const state = [123, 456]
    const result = [123]
    expect(queued(state, action)).toEqual(result)
  })

  test('should return an empty array when passed a type of "CLEAR_QUEUE"', () => {
    const action = {
      type: 'CLEAR_QUEUE',
    }
    const state = [123, 345]
    expect(queued(state, action)).toEqual([])
  })
})

describe('user() ', () => {

  test('should return an initial object by default', () => {

    const result = {
      email: '',
      password: '',
      verifyPassword: '',
      uid: null,
      displayName: '',
      team: '',
      admin: false,
    }
    expect(user(undefined, action)).toEqual(result)
  })

  test('should return "firstName", "lastName", "email", "password", and "verify" values when a type of "SET_USER_DATA" is submitted', () => {
    const action = {
      type: 'SET_USER_DATA',
      team: 'test1',
      displayName: 'test2',
      email: 'test3',
      uid: 'test4',
    }
    const state = {
      team: '',
      displayName: '',
      email: '',
      password: '',
      verifyPassword: '',
      uid: null,
    }
    const expected = {
      team: 'test1',
      displayName: 'test2',
      email: 'test3',
      uid: 'test4',
      password: '',
      verifyPassword: '',
    }
    expect(user(state, action)).toEqual(expected)
  })

  test('should replace property passed in upon action type of "SET_USER_PROPERTY"', () => {
    const action = {
      type: 'SET_USER_PROPERTY',
      email: 'test',
    }
    const state = {
      email: '',
      password: '',
      verifyPassword: '',
      uid: null,
      displayName: '',
      team: '',
    }
    const actual = user(state, action)
    const expected = {
      email: 'test',
      password: '',
      verifyPassword: '',
      uid: null,
      displayName: '',
      team: '',
    }
    expect(actual).toEqual(expected)
  })

  test('should delete user and password data upon action type of "CLEAR_USER_DATA"', () => {
    const action = {
      type: 'CLEAR_USER_DATA',
    }
    const state = {
      email: 'email',
      password: 'password1',
      verifyPassword: 'password1',
      uid: null,
      displayName: 'Peter Parker',
    }
    const result = {
      email: '',
      password: '',
      verifyPassword: '',
      uid: null,
      displayName: '',
    }
    expect(user(state, action)).toEqual(result)
  })
})

describe('authState() ', () => {

  test('should output an empty string by default', () => {
    const actual = authState(undefined, 'test')
    const expected = ''
    expect(actual).toBe(expected)
  })

  test('should return a string passed in as an action', () => {
    const state = ''
    const action = {
      type: 'SET_AUTH_STATE',
      authState: 'test'
    }
    const actual = authState(undefined, action)
    const expected = 'test'
    expect(actual).toBe(expected)
  })
})

describe('resetMetricState() ', () => {

  test('should return an object', () => {
    const actual = resetMetricState({})
    const expected = {}
    expect(actual).toEqual(expected)
  })

  test('should take an object and return an object with the same keys', () => {
    const testState = {
      a: {
        name: 'test',
        val: 5,
      },
    }
    const actual = Object.keys(resetMetricState(testState).a)
    const expected = ['name', 'val']
    expect(actual).toEqual(expected)
  })

  test('should swap out values for all entries in the metric values', () => {
    const testState = {
      a: {
        name: 'test1',
        val: 3,
      },
      b: {
        name: 'test2',
        val: 8,
      },
    }
    const actual = resetMetricState(testState)
    const expected = {
      a: {
        name: 'test1',
        val: 5,
      },
      b: {
        name: 'test2',
        val: 5,
      },
    }
    expect(actual).toEqual(expected)
  })
})

describe('data() ', () => {
  test('should return an initial data state object by default', () => {
    const actual = data(undefined, 'test')
    const expected = {
      loading: false,
      loaded: false,
      error: {},
    }
    expect(actual).toEqual(expected)
  })

  test('should return an error object in response to an action type of "SET_DATA_ERROR"', () => {
    const action = {
      type: 'SET_DATA_ERROR',
      testErr: 'test',
    }
    const state = {
      loading: false,
      loaded: false,
      error: {},
    }
    const actual = data(state, action)
    const expected = {
        loading: false,
        loaded: false,
        error: {
          testErr: 'test',
        },
      }
    expect(actual).toEqual(expected)
  })

  test('should add to an error object in response to an action type of "SET_DATA_ERROR"', () => {
    const action = {
      type: 'SET_DATA_ERROR',
      test2Err: 'test2',
    }
    const state = {
      loading: false,
      loaded: false,
      error: {
        testErr: 'test',
      },
    }
    const actual = data(state, action)
    const expected = {
        loading: false,
        loaded: false,
        error: {
          testErr: 'test',
          test2Err: 'test2',
        },
      }
    expect(actual).toEqual(expected)
  })

  test('should set the other data properties in response to "SET_DATA_PROPERTY"', () => {
    const action = {
      type: 'SET_DATA_PROPERTY',
      loading: true,
    }
    const state = {
      loading: false,
      loaded: false,
      error: {},
    }
    const actual = data(state, action)
    const expected = {
      loading: true,
      loaded: false,
      error: {},
    }
    expect(actual).toEqual(expected)
  })
})
