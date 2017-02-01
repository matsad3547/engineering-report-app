import {
  changeMetricVal,
  saveReportNotes,
  setNewReportConfig,
  saveReport,
        } from './index.js'

const metricValActionOutput = {
  id: 1,
  val: 'cheese',
  name: 'Cheesiness',
}

test('changeMetricVal() should return an object', () => {
  expect(typeof(changeMetricVal(metricValActionOutput))).toBe('object')
})

test ('changeMetricVal() action type should be "CHANGE_METRIC_VAL"', () => {
  expect(changeMetricVal(metricValActionOutput).type).toBe('CHANGE_METRIC_VAL')
})

test('saveReportNotes() action type should be "SAVE_REPORT_NOTES"', () => {
  let output = ''
  expect(saveReportNotes(output).type).toBe('SAVE_REPORT_NOTES')
})

test('saveReportNotes() should return a string', () => {
  let output = 'This is a test string'
  expect(saveReportNotes(output).string).toBe(output)
})

test ('setNewReportConfig() action type should be "SET_NEW_REPORT_CONFIG"', () => {
  let output = {}
  expect(setNewReportConfig(output).type).toBe('SET_NEW_REPORT_CONFIG')
})

test ('setNewReportConfig() should return an object with model, shortName, configNum, and ballast', () => {
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

test('saveReport() should return an object', () => {
  expect(typeof(saveReport())).toBe('object')
})

test('saveReport() should return an action type of "SAVE_REPORT_AND_RESET"', () => {
  expect(saveReport().type).toBe('SAVE_REPORT_AND_RESET')
})
