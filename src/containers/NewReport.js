import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import database from '../utils/firebase'

import { saveReport } from '../actions'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'

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
                      saveReport,
                      getReports,
                      getKeywords
                    }) => {

  const keys = Object.keys(metricValues)
                .map( k => parseInt(k, 10) )
                .sort( (a, b) => a - b)

  const submitReport = e => {

    e.preventDefault()
    const newReportKey = Date.now()
    const newReport = {
      config,
      metricValues,
      notes,
      uid,
    }
    const updates = {}
    updates[`teams/${team}/test reports/${newReportKey}`] = newReport
    database.ref()
      .update(updates)
    saveReport()
    getReports()
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
  }
}

const mapDispatchToProps = dispatch => {

  return {
    saveReport: () => dispatch(saveReport()),
    getReports: team => dispatch(getReports(team)),
    getKeywords: team => dispatch(getKeywords(team)),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(NewReport)
