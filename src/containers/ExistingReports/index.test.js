import {  formatReport,
          parseCSV, } from './index'

describe('formatReport() ', () => {

  test('should return an array', () => {
    expect(formatReport({})).toEqual([])
  })

  test('should convert a config object to an array of arrays', () => {
    const obj = {config: {
                            a: 1,
                            b: 2,
                          }
                        }
    const result = [['a', 1], ['b', 2]]
    expect(formatReport(obj)).toEqual(result)
  })

  test('should convert a metric values object to an array of arrays', () => {
    const obj = { metricValues: {
                                  0: {
                                    name: 'test',
                                    val: 2,
                                  },
                                }
  }
    const result = [['test', 2]]
    expect(formatReport(obj)).toEqual(result)
  })

  test('should convert a notes object to a string array', () => {
    const obj = { notes: 'this is a test string'}
    const result = [['this is a test string']]
    expect(formatReport(obj)).toEqual(result)
  })

  test('should convert a report object into a proper array of arrays', () => {
    const obj = {
      config: {
        a: 1,
      },
      metricValues: {
        0: {
          name: 'test1',
          val: 3,
        },
        1: {
          name: 'test2',
          val: 4,
        },
      },
      notes: 'this is a test string',
    }
    const result = [
      ['a', 1],
      ['test1', 3],
      ['test2', 4],
      ['this is a test string'],
    ]
    expect(formatReport(obj)).toEqual(result)
  })
})

describe('parseCSV() ', () => {

  test('should parse a report-ish object correctly', () => {
    const obj = {
      config: {
        a: 1,
      },
      metricValues: {
        0: {
          name: 'test1',
          val: 3,
        },
        1: {
          name: 'test2',
          val: 4,
        },
      },
      notes: 'this is a test string',
    }
    const result = 'data:text/csv;charset=utf-8,a,1\ntest1,3\ntest2,4\nthis is a test string\n'
    expect(parseCSV(formatReport(obj))).toEqual(result)
  })
})
