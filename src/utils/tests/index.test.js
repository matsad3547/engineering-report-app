import {
  formatReports,
  parseCSV,
  downloadQueued,
  resetMetricState,
} from '../index'

describe('formatReports() ', () => {

  // test('should return an array', () => {
  //   expect(formatReports({}, [])).toEqual([])
  // })

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
        ['weather',`"=""weather":"testy","temp_f":54""`]
      ]
      expect(actual).toEqual(expected)
  })

  // test('should convert a config object to an array of arrays', () => {
  //   const queued = [1]
  //   const reports = {
  //     1: {
  //         config: {
  //         a: 1,
  //         c: 2,
  //       }
  //     }
  //   }
  //   const result = [['a', 1], ['c', 2]]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })

  // test('should convert multiple config objects to an array of arrays', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //     1: {
  //         config: {
  //         a: 1,
  //         b: 2,
  //       }
  //     },
  //     2: {
  //         config: {
  //         a: 3,
  //         b: 4,
  //       }
  //     }
  //   }
  //   const result = [['a', 1, 3], ['b', 2, 4]]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })

  // test('should convert multiple config objects to an array of arrays and put stuff in the right order', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //     1: {
  //       config: {
  //         ballast: 'No',
  //         configNum: 2,
  //         model: 'Panigale',
  //         shortName: 'test1',
  //       },
  //     },
  //     2: {
  //       config: {
  //         ballast: 'Yes',
  //         configNum: 3,
  //         model: 'Panigale',
  //         shortName: 'test2',
  //       },
  //     }
  //   }
  //   const result = [
  //     ['model', 'Panigale', 'Panigale'],
  //     ['shortName', 'test1', 'test2'],
  //     ['configNum', 2, 3],
  //     ['ballast', 'No', 'Yes'],
  //   ]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
  // test('should convert a metric values object to an array of arrays', () => {
  //   const queued = [1]
  //   const reports = {
  //       1: { metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 2,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 3,
  //         },
  //       }
  //     }
  //   }
  //   const result = [['test1', 2], ['test2', 3]]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
  // test('should convert multiple metric values objects to an array of arrays', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //       1: { metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 2,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 3,
  //         },
  //       }
  //     },
  //       2: { metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 4,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 5,
  //         },
  //       }
  //     }
  //   }
  //   const result = [['test1', 2, 4], ['test2', 3, 5]]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
  // test('should convert a notes object to a string array', () => {
  //   const queued = [1]
  //   const reports = {
  //     1: { notes: 'this is a test string'}
  //   }
  //   const result = [['Notes', 'this is a test string']]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
  // test('should convert multiple notes objects to a string array', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //     1: { notes: 'this is a test string'},
  //     2: { notes: 'this is another test string'}
  //   }
  //   const result = [['Notes', 'this is a test string', 'this is another test string']]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
  // test('should convert a report object into a proper array of arrays', () => {
  //   const queued = [1]
  //   const reports = {
  //     1: {
  //       config: {
  //         a: 1,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 3,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 4,
  //         },
  //       },
  //       notes: 'this is a test string',
  //       weather: {
  //         weather: 'testy',
  //         temp_f: 54,
  //       },
  //     }
  //   }
  //   const result = [
  //     ['a', 1],
  //     ['test1', 3],
  //     ['test2', 4],
  //     ['Notes', 'this is a test string'],
  //     ['Weather',`"=""weather":"testy","temp_f":54""`],
  //   ]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })

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
      ['weather',`"=""weather":"testy","temp_f":54""`,`"=""weather":"testier","temp_f":65""`],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  // test('should convert multiple report objects into a proper array of arrays even without weather', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //
  //     1: {
  //       config: {
  //         a: 1,
  //         b: 2,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 3,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 4,
  //         },
  //       },
  //       notes: 'this is a test string',
  //       weather: {
  //         weather: 'testy',
  //         temp_f: 54,
  //       },
  //     },
  //     2: {
  //       config: {
  //         a: 2,
  //         b: 3,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 4,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 5,
  //         },
  //       },
  //       notes: 'this is a second test string',
  //     },
  //   }
  //   const result = [
  //     ['a', 1, 2],
  //     ['b', 2, 3],
  //     ['test1', 3, 4],
  //     ['test2', 4, 5],
  //     ['Notes', 'this is a test string', 'this is a second test string'],
  //     ['Weather','',`"=""weather":"testier","temp_f":65""`],
  //   ]
  //   expect(formatReports(reports, queued)).toEqual(result)
  // })
  //
})

describe('parseCSV() ', () => {

  // test('should parse a report-ish object correctly', () => {
  //   const queued = [1]
  //   const reports = {
  //     1: {
  //       config: {
  //         a: 1,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 3,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 4,
  //         },
  //       },
  //       notes: 'this is a test string',
  //     }
  //   }
  //   const result = 'data:text/csv;charset=utf-8,a,1\ntest1,3\ntest2,4\nNotes,this is a test string\n'
  //   expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  // })
  //
  // test('should parse multiple report-ish objects correctly', () => {
  //   const queued = [1, 2]
  //   const reports = {
  //     1: {
  //       config: {
  //         a: 1,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 3,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 4,
  //         },
  //       },
  //       notes: 'this is a test string',
  //     },
  //     2: {
  //       config: {
  //         a: 2,
  //       },
  //       metricValues: {
  //         0: {
  //           name: 'test1',
  //           val: 4,
  //         },
  //         1: {
  //           name: 'test2',
  //           val: 5,
  //         },
  //       },
  //       notes: 'this is another test string',
  //     }
  //   }
  //   const result = 'data:text/csv;charset=utf-8,a,1,2\ntest1,3,4\ntest2,4,5\nNotes,this is a test string,this is another test string\n'
  //   expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  // })
  //
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
