import {
  changeMetricVal,
  saveReportNotes,
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
