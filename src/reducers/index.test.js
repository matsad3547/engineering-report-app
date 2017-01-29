import {
  initMetricState,
  metricValues,
} from './index.js'

test ('inital metric state is an object', () => {
  expect(typeof(initMetricState)).toBe('object')
})

// test ('metricValues() should return an object', () => {
//   expect(typeof(metricValues()).toBe('object'))
// })
