import {
  changeMetricVal
} from './index.js'

const metricValActionOutput = {
  id: 1,
  val: 'cheese',
  name: 'Cheesiness',
}

test('changeMetricVal should return an object', () => {
  expect(typeof(changeMetricVal(metricValActionOutput))).toBe('object')
})
