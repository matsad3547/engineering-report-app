import {  formatReports,
          parseCSV,
          downloadQueued, } from './index'

describe('formatReports() ', () => {

  test('should return an array', () => {
    expect(formatReports({}, [])).toEqual([])
  })

  test('should convert a config object to an array of arrays', () => {
    const queued = [1]
    const reports = {
      1: {
          config: {
          a: 1,
          b: 2,
        }
      }
    }
    const result = [['a', 1], ['b', 2]]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple config objects to an array of arrays', () => {
    const queued = [1, 2]
    const reports = {
      1: {
          config: {
          a: 1,
          b: 2,
        }
      },
      2: {
          config: {
          a: 3,
          b: 4,
        }
      }
    }
    const result = [['a', 1, 3], ['b', 2, 4]]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert a metric values object to an array of arrays', () => {
    const queued = [1]
    const reports = {
        1: { metricValues: {
          0: {
            name: 'test1',
            val: 2,
          },
          1: {
            name: 'test2',
            val: 3,
          },
        }
      }
    }
    const result = [['test1', 2], ['test2', 3]]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple metric values objects to an array of arrays', () => {
    const queued = [1, 2]
    const reports = {
        1: { metricValues: {
          0: {
            name: 'test1',
            val: 2,
          },
          1: {
            name: 'test2',
            val: 3,
          },
        }
      },
        2: { metricValues: {
          0: {
            name: 'test1',
            val: 4,
          },
          1: {
            name: 'test2',
            val: 5,
          },
        }
      }
    }
    const result = [['test1', 2, 4], ['test2', 3, 5]]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert a notes object to a string array', () => {
    const queued = [1]
    const reports = {
      1: { notes: 'this is a test string'}
    }
    const result = [['Notes', 'this is a test string']]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple notes objects to a string array', () => {
    const queued = [1, 2]
    const reports = {
      1: { notes: 'this is a test string'},
      2: { notes: 'this is another test string'}
    }
    const result = [['Notes', 'this is a test string', 'this is another test string']]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert a report object into a proper array of arrays', () => {
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
      }
    }
    const result = [
      ['a', 1],
      ['test1', 3],
      ['test2', 4],
      ['Notes', 'this is a test string'],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
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
      ['Notes', 'this is a test string', 'this is a second test string'],
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
      }
    }
    const result = 'data:text/csv;charset=utf-8,a,1\ntest1,3\ntest2,4\nNotes,this is a test string\n'
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
      }
    }
    const result = 'data:text/csv;charset=utf-8,a,1,2\ntest1,3,4\ntest2,4,5\nNotes,this is a test string,this is another test string\n'
    expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  })
})
