import {
  formatReports,
  parseCSV,
  downloadQueued,
  resetMetricState,
  arrEqualsArr,
} from '../index'

describe('formatReports() ', () => {

  test('should convert a report-like object to an array of arrays', () => {
    const queued = [1]
    const reports = {
      1: {
          config: {
            a: 1,
            b: 2
          },
          metricValues: {
            0: {
              name: 'test1',
              val: 2,
            },
            1: {
              name: 'test2',
              val: 3,
            },
          },
          notes: 'this is a test string',
          weather: {
            weather: 'testy',
            temp_f: 54,
          },
        }
      }
      const actual = formatReports(reports, queued)
      const expected = [
        //config
        ['a', 1],
        ['b', 2],
        //mv's
        ['test1', 2],
        ['test2', 3],
        //notes
        ['notes', 'this is a test string'],
        //weather
        ['weather',`"=""weather:testy,temp_f:54"""`]
      ]
      expect(actual).toEqual(expected)
  })

  test('should convert multiple report objects into a proper array of arrays', () => {
    const queued = [1, 2]
    const reports = {

      1: {
        config: {
          a: 1,
          b: 2,
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
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      },
      2: {
        config: {
          a: 2,
          b: 3,
        },
        metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
        },
        notes: 'this is a second test string',
        weather: {
          weather: 'testier',
          temp_f: 65,
        },
      },
    }
    const result = [
      ['a', 1, 2],
      ['b', 2, 3],
      ['test1', 3, 4],
      ['test2', 4, 5],
      ['notes', 'this is a test string', 'this is a second test string'],
      ['weather',`"=""weather:testy,temp_f:54"""`,`"=""weather:testier,temp_f:65"""`],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple report objects into a proper array of arrays even without weather', () => {
    const queued = [1, 2]
    const reports = {

      1: {
        config: {
          a: 1,
          b: 2,
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
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      },
      2: {
        config: {
          a: 2,
          b: 3,
        },
        metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
        },
        notes: 'this is a second test string',
      },
    }
    const result = [
      ['a', 1, 2],
      ['b', 2, 3],
      ['test1', 3, 4],
      ['test2', 4, 5],
      ['notes', 'this is a test string', 'this is a second test string'],
      ['weather',`"=""weather:testy,temp_f:54"""`,'n/a'],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple report objects into a proper array of arrays even without weather in a different order', () => {
    const queued = [1, 2]
    const reports = {

      1: {
        config: {
          a: 1,
          b: 2,
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
      },
      2: {
        config: {
          a: 2,
          b: 3,
        },
        metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
        },
        notes: 'this is a second test string',
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      },
    }
    const result = [
      ['a', 1, 2],
      ['b', 2, 3],
      ['test1', 3, 4],
      ['test2', 4, 5],
      ['notes', 'this is a test string', 'this is a second test string'],
      ['weather','n/a',`"=""weather:testy,temp_f:54"""`],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple report objects into a proper array of arrays accomodating added metric values', () => {
    const queued = [1, 2]
    const reports = {

      1: {
        config: {
          a: 1,
          b: 2,
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
      },
      2: {
        config: {
          a: 2,
          b: 3,
        },
        metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
          2: {
            name: 'test3',
            val: 6,
          }
        },
        notes: 'this is a second test string',
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      },
    }
    const result = [
      ['a', 1, 2],
      ['b', 2, 3],
      ['test1', 3, 4],
      ['test2', 4, 5],
      ['test3', 'n/a', 6],
      ['notes', 'this is a test string', 'this is a second test string'],
      ['weather','n/a',`"=""weather:testy,temp_f:54"""`],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

})

describe('parseCSV() ', () => {

  test('should parse a report-ish object correctly', () => {
    const queued = [1]
    const reports = {
      1: {
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
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      }
    }
    const result = 'data:text/csv;charset=utf-8,a,1\ntest1,3\ntest2,4\nnotes,this is a test string\nweather,"=""weather:testy,temp_f:54"""\n'
    expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  })

  test('should parse multiple report-ish objects correctly', () => {
    const queued = [1, 2]
    const reports = {
      1: {
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
      },
      2: {
        config: {
          a: 2,
        },
        metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
        },
        notes: 'this is another test string',
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      }
    }
    const result = 'data:text/csv;charset=utf-8,a,1,2\ntest1,3,4\ntest2,4,5\nnotes,this is a test string,this is another test string\nweather,n/a,"=""weather:testy,temp_f:54"""\n'
    expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  })

})

describe('resetMetricState() ', () => {

  test('should return an object', () => {
    const actual = resetMetricState({})
    const expected = {}
    expect(actual).toEqual(expected)
  })

  test('should take an object and return an object with the same keys', () => {
    const testState = {
      a: {
        name: 'test',
        val: 5,
      },
    }
    const actual = Object.keys(resetMetricState(testState).a)
    const expected = ['name', 'val']
    expect(actual).toEqual(expected)
  })

  test('should swap out values for all entries in the metric values', () => {
    const testState = {
      a: {
        name: 'test1',
        val: 3,
      },
      b: {
        name: 'test2',
        val: 8,
      },
    }
    const actual = resetMetricState(testState)
    const expected = {
      a: {
        name: 'test1',
        val: 5,
      },
      b: {
        name: 'test2',
        val: 5,
      },
    }
    expect(actual).toEqual(expected)
  })
})

describe('arrEqualsArr()', () => {

  test('should return true if two arrays are the same', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    const actual = arrEqualsArr(arr1, arr2)
    const expected = true
    expect(actual).toEqual(expected)
  })

  test('should return false if two arrays are the different', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    const actual = arrEqualsArr(arr1, arr2)
    const expected = false
    expect(actual).toEqual(expected)
  })

  test('should return false if two arrays are the different', () => {
    const arr1 = [1, 2, 3]
    const arr2 = ['1', '2', '3']
    const actual = arrEqualsArr(arr1, arr2)
    const expected = false
    expect(actual).toEqual(expected)
  })

})
