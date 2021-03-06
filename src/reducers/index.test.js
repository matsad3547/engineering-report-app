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
  data,
  teamConfig,
  weather,
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

  test('should return reports passed in as a parameter an action type of "REPORTS_RECEIVED"', () => {

    const action = {
      type: 'REPORTS_RECEIVED',
      reports: ['test'],
      n: 10,
    }
    const actual = reports(undefined, action).reports
    const expected = ['test']

    expect(actual).toEqual(expected)
  })

  test('should return the number of reports passed in as a parameter an action type of "REPORTS_RECEIVED"', () => {

    const action = {
      type: 'REPORTS_RECEIVED',
      reports: ['test'],
      n: 10,
      allReports: true,
    }
    const actual = reports(undefined, action)
    const expected = {
      reports: ['test'],
      n: 10,
      allReports: true,
    }

    expect(actual).toEqual(expected)
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
      displayName: '',
      email: '',
      uid: null,
      password: '',
      verifyPassword: '',
      admin: false,
      approved: false,
      teams: [],
      team: 'demo',
      teammates: null
    }
    expect(user(undefined, action)).toEqual(result)
  })

  test('should return "team", "displayName", "email", "uid", "admin", and "approved" values when a type of "SET_USER_DATA" is submitted', () => {
    const action = {
      type: 'SET_USER_DATA',
      displayName: 'test2',
      email: 'test3',
      uid: 'test4',
      admin: true,
      approved: true,
      team: 'test',
    }
    const state = {
      displayName: '',
      email: '',
      password: '',
      verifyPassword: '',
      uid: null,
      admin: false,
      approved: false,
      team: '',
      teams: []
    }
    const expected = {
      displayName: 'test2',
      email: 'test3',
      uid: 'test4',
      password: '',
      verifyPassword: '',
      admin: true,
      approved: true,
      team: 'test',
      teams: [],
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
      displayName: 'Peter Parker',
      email: 'email',
      uid: '38394a;ljdfald',
      password: 'password1',
      verifyPassword: 'password1',
      admin: true,
      approved: true,
      team: 'test',
    }
    const result = {
      displayName: '',
      email: '',
      uid: null,
      password: '',
      verifyPassword: '',
      admin: false,
      approved: false,
      team: 'demo',
    }
    expect(user(state, action)).toEqual(result)
  })

  test('should delete  password data upon action type of "RESET_LOGIN"', () => {
    const action = {
      type: 'RESET_LOGIN',
    }
    const state = {
      displayName: 'Peter Parker',
      email: 'email',
      uid: '38394a;ljdfald',
      password: 'password1',
      verifyPassword: 'password1',
      admin: true,
      approved: true,
      team: 'test',
    }
    const result = {
      displayName: 'Peter Parker',
      email: 'email',
      uid: '38394a;ljdfald',
      password: '',
      verifyPassword: '',
      admin: true,
      approved: true,
      team: 'test',
    }
    expect(user(state, action)).toEqual(result)
  })
})

describe('data() ', () => {
  test('should return an initial data state object by default', () => {
    const actual = data(undefined, 'test')
    const expected = {
      dataIsFresh: false,
      loading: false,
      error: {},
      message: '',
    }
    expect(actual).toEqual(expected)
  })

  test('should return an error object in response to an action type of "SET_DATA_ERROR"', () => {
    const action = {
      type: 'SET_DATA_ERROR',
      testErr: 'test',
    }
    const state = {
      dataIsFresh: false,
      loading: false,
      error: {},
    }
    const actual = data(state, action)
    const expected = {
        dataIsFresh: false,
        loading: false,
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
      dataIsFresh: false,
      loading: false,
      error: {
        testErr: 'test',
      },
    }
    const actual = data(state, action)
    const expected = {
        dataIsFresh: false,
        loading: false,
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
      dataIsFresh: false,
      loading: false,
      error: {},
    }
    const actual = data(state, action)
    const expected = {
      dataIsFresh: false,
      loading: true,
      error: {},
    }
    expect(actual).toEqual(expected)
  })

  test('should set a `message` property in response to an action type of `SET_DATA_MESSAGE`', () => {
    const action = {
      type: 'SET_DATA_MESSAGE',
      message: 'This is a test',
    }
    const state = {
      dataIsFresh: false,
      loading: false,
      error: {},
      message: '',
    }
    const actual = data(state, action)
    const expected = {
      dataIsFresh: false,
      loading: false,
      error: {},
      message: 'This is a test',
    }
    expect(actual).toEqual(expected)
  })
})

describe('teamConfig()', () => {

  test('should return an init state object by default', () => {
    const actual = teamConfig(undefined, 'test')
    const expected = {
      team: '',
      keyword: '',
      keywords: [],
    }
    expect(actual).toEqual(expected)
  })

  test('should return a state with a new property in response to an action type of "SET_TEAM_PROPERTY"', () => {
    const state = {
      team: 'words',
    }
    const action = {
      type: 'SET_TEAM_PROPERTY',
      team: 'test'
    }
    const actual = teamConfig(state, action)
    const expected = {
      team: 'test',
    }
    expect(actual).toEqual(expected)
  })

  test('should add a keyword to the keyword array in response to an action type of "SET_TEAM_KEYWORD"', () => {
    const state = {
      keywords: [],
    }
    const action = {
      type: 'SET_TEAM_KEYWORD',
      keyword: 'test',
    }
    const actual = teamConfig(state, action)
    const expected = {
      keywords: ['test'],
    }
    expect(actual).toEqual(expected)
  })

  test('should add a keyword to the beginning of the keyword array in response to an action type of "SET_TEAM_KEYWORD"', () => {
    const state = {
      keywords: ['cheese'],
    }
    const action = {
      type: 'SET_TEAM_KEYWORD',
      keyword: 'test',
    }
    const actual = teamConfig(state, action)
    const expected = {
      keywords: ['test', 'cheese'],
    }
    expect(actual).toEqual(expected)
  })

  test('should remove a keyword from the keyword array in response to an action type of "SET_TEAM_KEYWORD" if it is already in there', () => {
    const state = {
      keywords: ['test', 'cheese'],
    }
    const action = {
      type: 'SET_TEAM_KEYWORD',
      keyword: 'test',
    }
    const actual = teamConfig(state, action)
    const expected = {
      keywords: ['cheese'],
    }
    expect(actual).toEqual(expected)
  })

  test('should set keywords in response to an action type of "KEYWORDS_RECEIVED"', () => {
    const state = {
      keywords: [],
    }
    const action = {
      type: 'KEYWORDS_RECEIVED',
      keywords: ['test', 'cheese'],
    }
    const actual = teamConfig(state, action)
    const expected = {
      keywords: ['test', 'cheese'],
    }
    expect(actual).toEqual(expected)
  })

  test('should reset to init values in response to an action type of "CLEAR_USER_DATA"', () => {
    const state = {
      team: 'test',
      keyword: 'cheese',
      keywords: ['a', 'b']
    }
    const action = {
      type: 'CLEAR_USER_DATA'
    }
    const actual = teamConfig(state, action)
    const expected = {
      team: '',
      keyword: '',
      keywords: [],
    }
    expect(actual).toEqual(expected)
  })
})

describe('weather()', () => {
  test('should return `null` by default', () => {
    const actual = weather(undefined, test)
    const expected = null
    expect(actual).toEqual(expected)
  })

  test('should return a weather object in response to an action type of "SET_WEATHER_DATA"', () => {
    const action = {
      type: 'SET_WEATHER_DATA',
      weather: {
        relative_humidity: "87%",
        weather: "Overcast",
        temp_f: 23.4,
        wind_dir: "SE",
        wind_gust_mph: 0,
        wind_mph: 0,
        location: "Driggs, ID",
      }
    }
    const actual = weather(undefined, action)
    const expected = {
      relative_humidity: "87%",
      weather: "Overcast",
      temp_f: 23.4,
      wind_dir: "SE",
      wind_gust_mph: 0,
      wind_mph: 0,
      location: "Driggs, ID",
    }
    expect(actual).toEqual(expected)
  })
})
