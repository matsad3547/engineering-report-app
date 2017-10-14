import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import database from '../utils/firebase'

import { saveReport } from '../actions'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'

import Loading from '../components/Loading'

import ConfigForm from '../containers/ConfigForm'
import DropDownSliderInput from '../containers/DropDownSliderInput'
import NoteField from '../containers/NoteField'

const NewReport = ({  config,
                      metricValues,
                      notes,
                      previousMetricValues,
                      team,
                      uid,
                      loading,
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
    let updates = {}
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

  if(loading) {
    return (
      <Loading message={'Loading...'}/>
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

  const { reportConfig,
          metricValues,
          notes,
          previousMetricValues,
        } = state

  const { team, uid } = state.user

  const { loading } = state.data

  return {
    config: reportConfig,
    metricValues,
    notes,
    previousMetricValues,
    team,
    uid,
    loading,
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
