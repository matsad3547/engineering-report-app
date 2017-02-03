import {
  changeMetricVal,
  saveReportNotes,
  setNewReportConfig,
  saveReport,
  selectPage,
  requestReports,
  receiveReports,
  reportError,
        } from './index.js'

import {
  getReports,
  getFirstTen,
        } from './getReports'

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

describe('setNewReportConfig() ', () => {

  test ('action type should be "SET_NEW_REPORT_CONFIG"', () => {
    let output = {}
    expect(setNewReportConfig(output).type).toBe('SET_NEW_REPORT_CONFIG')
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
    expect(Object.keys(setNewReportConfig(output))).toEqual(returnValues)
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

describe('selectPage() ', () => {

  test('should return an object', () => {
    expect(typeof(selectPage())).toBe('object')
  })

  test('should return an action type of "CHANGE_PAGE"', () => {
    expect(selectPage(undefined).type).toBe('CHANGE_PAGE')
  })
})

describe( 'getFirstTen() ', () => {

  test('should return an array', () => {
    expect(getFirstTen()).toEqual([])
  })

  test('should return an array with a max of ten items', () => {
    const test = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
    }
    expect(getFirstTen(test).length).toBe(10)
  })
})

describe('requestReports() ', () => {

  test('should return an object', () => {
    expect(typeof(requestReports(undefined))).toBe('object')
  })

  test('should return an action type of "REPORTS_REQUESTED"', () => {
    expect(requestReports().type).toBe('REPORTS_REQUESTED')
  })

})

describe('receiveReports() ', () => {

  test('should return an object', () => {
    expect(typeof(receiveReports(undefined))).toBe('object')
  })

  test('should return an action type of "REPORTS_RECEIVED"', () => {
    expect(receiveReports().type).toBe('REPORTS_RECEIVED')
  })

  test('should return a report variable passed into it', () => {
    expect(receiveReports('test').reports).toBe('test')
  })

})

describe('reportError() ', () => {

  test('should return an object', () => {
    expect(typeof(reportError())).toBe('object')
  })

  test('should return an action type of "REPORT_ERROR"', () => {
    expect(reportError().type).toBe('REPORT_ERROR')
  })

  test('should return any error passed in as a parameter', () => {
    expect(reportError('test').error).toBe('test')
  })
})

describe( 'getReports() ', () => {
  test('should do something', () => {
    expect(getReports('reports')).toEqual()
  })
})
