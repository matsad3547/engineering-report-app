import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import database from '../utils/firebase'

import {
  saveReport,
  setDataProperty,
  setDataMessage,
  saveReportNotes,
  changeMetricVal,
 } from '../actions'

import getReports from '../actions/getReports'
import getKeywords from '../actions/getKeywords'

import ConfigForm from './ConfigForm'
import MessagePopUp from './MessagePopUp'
import ErrorPopUp from './ErrorPopUp'

import DropDownSliderInput from '../components/DropDownSliderInput'
import NoteField from '../components/NoteField'
import Weather from '../components/Weather/'

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
                      clearWeatherErr,
                      saveReportNotes,
                      changeMetricVal,
                      setSavedMessage,
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
      weather: Object.keys(weather)
                .filter( k => k !== 'image' )
                .reduce( (obj, k) => ({
                  ...obj,
                  [k]: weather[k],
                }), {}),
      uid: team === 'demo' ? '12345' : uid,
    }
    const updates = {}
    updates[`teams/${team}/test reports/${newReportKey}`] = newReport
    database.ref()
      .update(updates)
    saveReport()
    getReports()
    setDataProperty({loading: false})
    setSavedMessage()
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
          <p>{keywordsErr.message}</p>
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
        changeMetricVal={changeMetricVal}
        />
      )}
      <NoteField
        notes={notes}
        saveReportNotes={saveReportNotes}
        />
      <Weather
        weather={weather}
        />
      <RaisedButton
        label="Save Report"
        style={styles.button}
        className="reportButton"
        onClick={submitReport}
        />
      <MessagePopUp />
      <ErrorPopUp
        errorKey="weatherErr"
        message="There was an error loading the weather"
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

  const { keywordsErr } = error

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
  }
}

const mapDispatchToProps = dispatch => ({

  saveReport: () => dispatch(saveReport()),
  getReports: team => dispatch(getReports(team)),
  getKeywords: team => dispatch(getKeywords(team)),
  setDataProperty: property => dispatch(setDataProperty(property)),
  saveReportNotes: notes => dispatch(saveReportNotes(notes)),
  changeMetricVal: output => dispatch(changeMetricVal(output)),
  setSavedMessage: () => dispatch(setDataMessage('Your report has been saved')),
})

NewReport.propTypes = {
  config: PropTypes.object,
  metricValues: PropTypes.object,
  notes: PropTypes.string,
  previousMetricValues: PropTypes.arrayOf(PropTypes.number),
  team: PropTypes.string,
  uid: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  keywordsErr: PropTypes.string,
  weather: PropTypes.object,
  weatherErr: PropTypes.string,
  saveReport: PropTypes.func,
  getReports: PropTypes.func,
  getKeywords: PropTypes.func,
  setDataProperty: PropTypes.func,
  clearWeatherErr: PropTypes.func,
  saveReportNotes: PropTypes.func,
  changeMetricVal: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(NewReport)
