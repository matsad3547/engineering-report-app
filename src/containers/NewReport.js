import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import database from '../utils/firebase'

import {
  saveReport,
  setDataProperty,
 } from '../actions'
import getReports from '../actions/getReports'
import getKeywords from '../actions/getKeywords'

import ConfigForm from '../containers/ConfigForm'
import DropDownSliderInput from '../containers/DropDownSliderInput'
import NoteField from '../containers/NoteField'

const NewReport = ({  config,
                      metricValues,
                      notes,
                      previousMetricValues,
                      team,
                      uid,
                      keywords,
                      keywordsErr,
                      weather,
                      weatherErr,
                      saveReport,
                      getReports,
                      getKeywords,
                      setDataProperty,
                    }) => {

  const keys = Object.keys(metricValues)
                .map( k => parseInt(k, 10) )
                .sort( (a, b) => a - b)

  const submitReport = e => {

    e.preventDefault()
    setDataProperty({loading: true})
    const newReportKey = Date.now()
    const newReport = {
      config,
      metricValues,
      notes,
      uid: team === 'demo' ? 12345 : uid,
    }
    const updates = {}
    updates[`teams/${team}/test reports/${newReportKey}`] = newReport
    database.ref()
      .update(updates)
    saveReport()
    getReports()
    setDataProperty({loading: false})
  }

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

  if (keywordsErr) {
      return (
        <div className="existingReports">
          <h3>Keyword loading has failed, sorry!</h3>
          <p>{keywordsErr}</p>
        </div>
    )
  }
  else if (keywords.length === 0) {
    return (
      <div className="existingReports">
        <h3>No keywords have been set</h3>
      </div>
    )
  }

  return (
    <div className="reportInput">

      <ConfigForm
        config={config}
        />
      <hr/>

      {keys.map( (key, i) =>
        <DropDownSliderInput
        key={i + 'b'}
        id={key}
        name={metricValues[key].name}
        value={metricValues[key].val}
        previousVal={previousMetricValues[i] ? previousMetricValues[i] : 4.5}
        />
      )}
      <NoteField
        notes={notes}
        />
      {weather ?
        <div  className="weather">
          <hr/>
          <table>
            <tbody>
              <tr>
                {weather.weather ?
                  <td>{weather.weather}</td> : <td></td>
                }
                {weather.temp_f ?
                  <td>{weather.temp_f}&#8457;</td> : <td></td>
                }
                {weather.relative_humidity ?
                  <td>{weather.relative_humidity}</td> : <td></td>
                }
                <td>Humidity</td>
              </tr>
              <tr>
                <td>Wind avg/gust(mph)</td>
                {weather.wind_mph !== undefined ?
                  <td>{weather.wind_mph}</td> : <td></td>
                }
                {weather.wind_gust_mph !== undefined  ?
                  <td>{weather.wind_gust_mph}</td> : <td></td>
                }
                {weather.wind_dir !== undefined ?
                  <td>{weather.wind_dir}</td> : <td></td>
                }
              </tr>


            </tbody>
          </table>
          <div className="wu-img">
            <p>Powered by</p>
            <img
              src={weather.image.url}
              height={30}
              alt="Wunderground"></img>
          </div>
          <hr/>
        </div>
       : ''}
      <RaisedButton
        label="Save Report"
        style={styles.button}
        className="reportButton"
        onClick={submitReport}
        />

    </div>
  )
}

const mapStateToProps = state => {

  const {
    reportConfig,
    metricValues,
    notes,
    previousMetricValues,
    weather,
  } = state

  const {
    uid,
    team,
  } = state.user

  const { error } = state.data

  const {
    keywordsErr,
    weatherErr,
  } = error

  const { keywords } = state.teamConfig

  return {
    config: reportConfig,
    metricValues,
    notes,
    previousMetricValues,
    team,
    uid,
    keywords,
    keywordsErr,
    weather,
    weatherErr,
  }
}

const mapDispatchToProps = dispatch => ({

  saveReport: () => dispatch(saveReport()),
  getReports: team => dispatch(getReports(team)),
  getKeywords: team => dispatch(getKeywords(team)),
  setDataProperty: property => dispatch(setDataProperty(property)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(NewReport)
