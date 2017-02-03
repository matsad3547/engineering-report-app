import {
  changeMetricVal,
  saveReportNotes,
  setNewReportConfig,
  saveReport,
  selectPage,
        } from './index.js'

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
