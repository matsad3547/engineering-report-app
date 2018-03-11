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
        ['notes', `"=""this is a test string"""`],
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
      ['notes', `"=""this is a test string"""`, `"=""this is a second test string"""`],
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
      ['notes', `"=""this is a test string"""`, `"=""this is a second test string"""`],
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
      ['notes', `"=""this is a test string"""`, `"=""this is a second test string"""`],
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
      ['notes', `"=""this is a test string"""`, `"=""this is a second test string"""`],
      ['weather','n/a',`"=""weather:testy,temp_f:54"""`],
    ]
    expect(formatReports(reports, queued)).toEqual(result)
  })

  test('should convert multiple report objects with real config and metric values into a proper array of arrays', () => {
    const queued = [1, 2]
    const reports = {
      1: {
        config: {
          ballast: 'No',
          configNum: 1,
          model: 'string 1',
          shortName: 'string 2',
        },
        metricValues: {
          0: {
            name: 'TiR',
            val: 3,
          },
          1: {
            name: 'TiE',
            val: 4,
          },
          2: {
            name: 'TE',
            val: 5,
          },
          3: {
            name: 'RR',
            val: 6,
          },
          4: {
            name: 'RL',
            val: 7,
          },
          5: {
            name: 'RD',
            val: 8,
          },
          6: {
            name: 'SR',
            val: 9,
          },
          7: {
            name: 'SD',
            val: 10,
          },
          8: {
            name: 'YD',
            val: 11,
          },
          9: {
            name: 'SSTE',
            val: 12,
          },
          10: {
            name: 'SSTG',
            val: 13,
          },
          11: {
            name: 'CC',
            val: 14,
          },
          12: {
            name: 'CG',
            val: 15,
          },
          13: {
            name: 'CB',
            val: 16,
          },
          14: {
            name: 'Bu-iT',
            val: 17,
          },
          15: {
            name: 'Br-iT',
            val: 18,
          },
        },
        notes: 'this is a test string',
      },
      2: {
        config: {
          ballast: 'No',
          configNum: 2,
          model: 'string 3',
          shortName: 'string 4',
        },
        metricValues: {
          0: {
            name: 'TiR',
            val: 2.5,
          },
          1: {
            name: 'TiE',
            val: 3.5,
          },
          2: {
            name: 'TE',
            val: 4.5,
          },
          3: {
            name: 'RR',
            val: 5.5,
          },
          4: {
            name: 'RL',
            val: 6.5,
          },
          5: {
            name: 'RD',
            val: 7.5,
          },
          6: {
            name: 'SR',
            val: 8.5,
          },
          7: {
            name: 'SD',
            val: 9.5,
          },
          8: {
            name: 'YD',
            val: 10.5,
          },
          9: {
            name: 'SSTE',
            val: 11.5,
          },
          10: {
            name: 'SSTG',
            val: 12.5,
          },
          11: {
            name: 'CC',
            val: 13.5,
          },
          12: {
            name: 'CG',
            val: 14.5,
          },
          13: {
            name: 'CB',
            val: 15.5,
          },
          14: {
            name: 'Bu-iT',
            val: 16.5,
          },
          15: {
            name: 'Br-iT',
            val: 17.5,
          },
        },
        notes: 'this is another test string',
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      }
    }
    const result = [
      ['model', 'string 1', 'string 3'],
      ['shortName', 'string 2', 'string 4'],
      ['configNum', 1, 2],
      ['ballast', 'No', 'No'],
      ['TiR', 3, 2.5],
      ['TiE', 4, 3.5],
      ['TE', 5, 4.5],
      ['RR', 6, 5.5],
      ['RL', 7, 6.5],
      ['RD', 8, 7.5],
      ['SR', 9, 8.5],
      ['SD', 10, 9.5],
      ['YD', 11, 10.5],
      ['SSTE', 12, 11.5],
      ['SSTG', 13, 12.5],
      ['CC', 14, 13.5],
      ['CG', 15, 14.5],
      ['CB', 16, 15.5],
      ['Bu-iT', 17, 16.5],
      ['Br-iT', 18, 17.5],
      ['notes', `"=""this is a test string"""`, `"=""this is another test string"""`],
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
    const result = 'data:text/csv;charset=utf-8,a,1\ntest1,3\ntest2,4\nnotes,"=""this is a test string"""\nweather,"=""weather:testy,temp_f:54"""\n'
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
    const result = 'data:text/csv;charset=utf-8,a,1,2\ntest1,3,4\ntest2,4,5\nnotes,"=""this is a test string""","=""this is another test string"""\nweather,n/a,"=""weather:testy,temp_f:54"""\n'
    expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  })

  test('should parse multiple report objects with real config objects correctly', () => {
    const queued = [1, 2]
    const reports = {
      1: {
        config: {
          ballast: 'No',
          configNum: 1,
          model: 'string 1',
          shortName: 'string 2',
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
          ballast: 'No',
          configNum: 2,
          model: 'string 3',
          shortName: 'string 4',
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
    const result = 'data:text/csv;charset=utf-8,ballast,No,No\nconfigNum,1,2\nmodel,string 1,string 3\nshortName,string 2,string 4\ntest1,3,4\ntest2,4,5\nnotes,"=""this is a test string""","=""this is another test string"""\nweather,n/a,"=""weather:testy,temp_f:54"""\n'
    expect(parseCSV(formatReports(reports, queued))).toEqual(result)
  })

  test('should parse multiple report objects with real config objects and real value names correctly', () => {
    const queued = [1, 2]
    const reports = {
      1: {
        config: {
          ballast: 'No',
          configNum: 1,
          model: 'string 1',
          shortName: 'string 2',
        },
        metricValues: {
          0: {
            name: 'TiR',
            val: 3,
          },
          1: {
            name: 'TiE',
            val: 4,
          },
          2: {
            name: 'TE',
            val: 5,
          },
          3: {
            name: 'RR',
            val: 6,
          },
          4: {
            name: 'RL',
            val: 7,
          },
          5: {
            name: 'RD',
            val: 8,
          },
          6: {
            name: 'SR',
            val: 9,
          },
          7: {
            name: 'SD',
            val: 10,
          },
          8: {
            name: 'YD',
            val: 11,
          },
          9: {
            name: 'SSTE',
            val: 12,
          },
          10: {
            name: 'SSTG',
            val: 13,
          },
          11: {
            name: 'CC',
            val: 14,
          },
          12: {
            name: 'CG',
            val: 15,
          },
          13: {
            name: 'CB',
            val: 16,
          },
          14: {
            name: 'Bu-iT',
            val: 17,
          },
          15: {
            name: 'Br-iT',
            val: 18,
          },
        },
        notes: 'this is a test string',
      },
      2: {
        config: {
          ballast: 'No',
          configNum: 2,
          model: 'string 3',
          shortName: 'string 4',
        },
        metricValues: {
          0: {
            name: 'TiR',
            val: 2.5,
          },
          1: {
            name: 'TiE',
            val: 3.5,
          },
          2: {
            name: 'TE',
            val: 4.5,
          },
          3: {
            name: 'RR',
            val: 5.5,
          },
          4: {
            name: 'RL',
            val: 6.5,
          },
          5: {
            name: 'RD',
            val: 7.5,
          },
          6: {
            name: 'SR',
            val: 8.5,
          },
          7: {
            name: 'SD',
            val: 9.5,
          },
          8: {
            name: 'YD',
            val: 10.5,
          },
          9: {
            name: 'SSTE',
            val: 11.5,
          },
          10: {
            name: 'SSTG',
            val: 12.5,
          },
          11: {
            name: 'CC',
            val: 13.5,
          },
          12: {
            name: 'CG',
            val: 14.5,
          },
          13: {
            name: 'CB',
            val: 15.5,
          },
          14: {
            name: 'Bu-iT',
            val: 16.5,
          },
          15: {
            name: 'Br-iT',
            val: 17.5,
          },
        },
        notes: 'this is another test string',
        weather: {
          weather: 'testy',
          temp_f: 54,
        },
      }
    }
    const result = 'data:text/csv;charset=utf-8,model,string 1,string 3\nshortName,string 2,string 4\nconfigNum,1,2\nballast,No,No\nTiR,3,2.5\nTiE,4,3.5\nTE,5,4.5\nRR,6,5.5\nRL,7,6.5\nRD,8,7.5\nSR,9,8.5\nSD,10,9.5\nYD,11,10.5\nSSTE,12,11.5\nSSTG,13,12.5\nCC,14,13.5\nCG,15,14.5\nCB,16,15.5\nBu-iT,17,16.5\nBr-iT,18,17.5\nnotes,"=""this is a test string""","=""this is another test string"""\nweather,n/a,"=""weather:testy,temp_f:54"""\n'
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
