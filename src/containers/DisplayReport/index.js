import React from 'react'
import { connect } from 'react-redux'
import './DisplayReport.css'

import { date } from '../../utils/'

import { configOrder } from '../../config'

const DisplayReport = ({  report,
                          config,
                          metricValues,
                          notes,
                          weather,
                          displayName,
                          team,
                        }) => {
  if (!!config) {

    const metricValArr = Object.keys(metricValues)
    const configVals = Object.keys(config)
                        .sort( (a, b) => configOrder.indexOf(a[0]) < configOrder.indexOf(b[0]) ? -1 : 1)

    const weatherVals = weather ? Object.keys(weather) : null

    return(
      <div className="reportDisplay">
        <h3>Report From {date(report)}</h3>

        { team !== 'demo' ?
          <div>
            <table className="author">
              <tbody>
                <tr>
                  <td>Author:</td>
                  <td>{displayName ? displayName : '<name is not available>'}</td>
                </tr>
              </tbody>
            </table>
            <hr/>
          </div> : ''}
        <h4>Configuration Values</h4>
        <table>
          <tbody>
            {configVals.map( (c, i) =>
              <tr key={`config-${i}`}>
                <td>{c}:</td>
                <td className="val">{config[c]}</td>
              </tr>
            )}
          </tbody>
        </table>
        <br/>
        <hr/>
        <h4>Metric Values</h4>
        <table>
          <tbody>
            {metricValArr.map( (c, i) =>
              <tr key={i+'a'}><td key={i+'b'}>{metricValues[i].name}:</td>
              <td key={i+'c'}
                className="val">{metricValues[i].val}</td>
              </tr>  )}
          </tbody>
        </table>
        <br/>
        <hr/>
        <h4>Notes</h4>
        <p>{notes}</p>
        {weather ?
          <div>
            <br/>
            <hr/>
            <h4>Weather</h4>
            <table>
              <tbody>
                {weatherVals.map( (w, i) =>
                  <tr key={`weather-${i}`}>
                    <td>{w}:</td>
                    <td className="val">{weather[w]}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> : ''
        }
        <br/>
        <hr/>
      </div>
    )
  }
  return (
    <div className="reportDisplay">
      <h4>Report From {date(report)} is loading...</h4>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  const report = ownProps.params.report

  const reportVals =  state.reports.reports ?
   state.reports.reports[report] : null

  return {
    report,
    config: reportVals ? reportVals.config : null,
    metricValues: reportVals ? reportVals.metricValues : null,
    notes: reportVals ? reportVals.notes : null,
    weather: reportVals ? reportVals.weather : null,
    displayName: state.user.displayName,
    team: state.user.team,
  }
}

export default connect(mapStateToProps)(DisplayReport)
