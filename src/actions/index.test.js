import {
  changeMetricVal,
  saveReportNotes,
  setReportConfig,
  saveReport,
  requestReports,
  receiveReports,
  reportError,
  queueReport,
  unqueueReport,
  clearQueue,
  setUserData,
  setUserProperty,
  clearUserData,
  requestKeywords,
  receiveKeywords,
  keywordError,
  setAuthState,
  resetMetricState,
  setDataProperty,
  setDataError,
  } from './index.js'

import {
  getReports,
  } from './getReports'

import {
  getKeywords,
  } from './getKeywords'

const metricValActionOutput = {
  id: 1,
  val: 'cheese',
  name: 'Cheesiness',
}

describe('changeMetricVal() ', () => {

  test('should return an object', () => {
    expect(typeof(changeMetricVal(metricValActionOutput))).toBe('object')
  })

  test ('action type should be "CHANGE_METRIC_VAL"', () => {
    expect(changeMetricVal(metricValActionOutput).type).toBe('CHANGE_METRIC_VAL')
  })
})

describe('saveReportNotes() ', () => {
  test('action type should be "SAVE_REPORT_NOTES"', () => {
    let output = ''
    expect(saveReportNotes(output).type).toBe('SAVE_REPORT_NOTES')
  })

  test('should return a string', () => {
    let output = 'This is a test string'
    expect(saveReportNotes(output).string).toBe(output)
  })
})

describe('setReportConfig() ', () => {

  test ('action type should be "SET_NEW_REPORT_CONFIG"', () => {
    let output = {}
    expect(setReportConfig(output).type).toBe('SET_NEW_REPORT_CONFIG')
  })

  test ('should return an object with model, shortName, configNum, and ballast', () => {
    let output = {
      type: 'SET_NEW_REPORT_CONFIG',
      model: 'string',
      shortName: 'string',
      configNum: 1,
      ballast: false,
    }
    let returnValues = Object.keys(output)
    expect(Object.keys(setReportConfig(output))).toEqual(returnValues)
  })
})

describe('saveReport() ', () => {

  test('should return an object', () => {
    expect(typeof(saveReport())).toBe('object')
  })

  test('should return an action type of "SAVE_REPORT_AND_RESET"', () => {
    expect(saveReport().type).toBe('SAVE_REPORT_AND_RESET')
  })
})

describe('receiveReports() ', () => {

  test('should return an object', () => {
    expect(typeof(receiveReports(undefined))).toBe('object')
  })

  test('should return an action type of "REPORTS_RECEIVED"', () => {
    expect(receiveReports().type).toBe('REPORTS_RECEIVED')
  })

  test('should return a report variable passed into it and number', () => {
    const actual = receiveReports('test', 10)
    const expected = {
      type: 'REPORTS_RECEIVED',
      reports: 'test',
      n: 10,
    }
    expect(actual).toEqual(expected)
  })

})

describe( 'getReports() ', () => {

  test('should do return a function', () => {
    expect(typeof(getReports('reports'))).toBe('function')
  })
})

describe('queueReport() ', () => {

  test('should return an object', () => {
    expect(typeof(queueReport(undefined))).toBe('object')
  })

  test('should return an action type of "QUEUE_REPORT"', () => {
    expect(queueReport(undefined).type).toBe('QUEUE_REPORT')
  })

  test('should return a second property of "report"', () => {
    expect(Object.keys(queueReport(undefined))).toEqual(['type', 'report'])
  })
})

describe('unqueueReport() ', () => {

  test('should return an object', () => {
    expect(typeof(unqueueReport(undefined))).toBe('object')
  })

  test('should return an action type of "UNQUEUE_REPORT"', () => {
    expect(unqueueReport(undefined).type).toBe('UNQUEUE_REPORT')
  })

  test('should also return a second property of "index"', () => {
    expect(Object.keys(unqueueReport(undefined))).toEqual(['type', 'index'])
  })
})

describe('clearQueue() ', () => {

  test('should return an object', () => {
    expect(typeof(clearQueue())).toBe('object')
  })

  test('should return an action type of "CLEAR_QUEUE"', () => {
    expect(clearQueue().type).toBe('CLEAR_QUEUE')
  })
})

describe('setUserData() ', () => {

  test('should return an object', () => {
    expect(typeof(setUserData('test'))).toBe('object')
  })

  test('should return an action type of "SET_USER_DATA"', () => {
    expect(setUserData('test').type).toBe('SET_USER_DATA')
  })

  test('should return `team`, `displayName`, `email`, `uid`, `admin`, and `approved` ', () => {

    const output = {
      team: 'test',
      displayName: 'test',
      email: 'test',
      uid: 'test',
      admin: true,
      approved: true,
    }

    const result = {
      type: 'SET_USER_DATA',
      team: 'test',
      displayName: 'test',
      email: 'test',
      uid: 'test',
      admin: true,
      approved: true,
    }

    expect(setUserData(output)).toEqual(result)
  })
})

describe('setUserProperty()', () => {
  test('should return a type of "SET_USER_PROPERTY" ', () => {
    const actual = setUserProperty({email: 'test'})
    const expected = {
      type: 'SET_USER_PROPERTY',
      email: 'test',
    }
    expect(actual).toEqual(expected)
  })
})

describe('clearUserData() ', () => {

  test('should return an object', () => {
    expect(typeof(clearUserData())).toBe('object')
  })

  test('should return a type of "CLEAR_USER_DATA"', () => {
    expect(clearUserData().type).toBe('CLEAR_USER_DATA')
  })
})

describe('receiveKeywords() ', () => {

  test('should return an object', () => {
    expect(typeof(receiveKeywords(undefined))).toBe('object')
  })

  test('should return an action type of "KEYWORDS_RECEIVED"', () => {
    expect(receiveKeywords().type).toBe('KEYWORDS_RECEIVED')
  })

  test('should return a keyword variable passed into it', () => {
    expect(receiveKeywords(['test1', 'test2']).keywords).toEqual(['test1', 'test2'])
  })
})

describe( 'getKeywords() ', () => {

  test('should return a function', () => {
    expect(typeof(getKeywords('demo'))).toBe('function')
  })
})

describe('setDataProperty()', () => {
  test('should return a type of "SET_DATA_PROPERTY"', () => {
    const actual = setDataProperty({}).type
    const expected = "SET_DATA_PROPERTY"
    expect(actual).toEqual(expected)
  })

  test('should return a data property object passed in', () => {
    const error = {loading: true}
    const actual = setDataProperty(error)
    const expected = {
      type: "SET_DATA_PROPERTY",
      loading: true,
    }
    expect(actual).toEqual(expected)
  })
})

describe('setDataError()', () => {
  test('should return a type of "SET_DATA_ERROR"', () => {
    const actual = setDataError({}).type
    const expected = 'SET_DATA_ERROR'
    expect(actual).toEqual(expected)
  })

  test('should return an error object passed in with a type of "SET_DATA_ERROR"', () => {
    const error = {
      testErr: 'test',
    }
    const actual = setDataError(error)
    const expected = {
      type: 'SET_DATA_ERROR',
      testErr: 'test',
    }
    expect(actual).toEqual(expected)
  })
})
