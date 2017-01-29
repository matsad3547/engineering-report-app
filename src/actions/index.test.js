import {
  changeMetricVal
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
