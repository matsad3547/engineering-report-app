import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

import {
  queueReport,
  unqueueReport,
  clearQueue,
  setDataProperty,
} from '../../actions/'
import getReports from '../../actions/getReports'
import ReportItem from '../../components/ReportItem'
import { downloadQueued } from '../../utils/'

const ExistingReports = ({  reports,
                            n,
                            allReports,
                            queued,
                            reportErr,
                            admin,
                            queueReport,
                            unqueueReport,
                            clearQueue,
                            getReports,
                          }) => {

  const download = e => {
    e.preventDefault()
    downloadQueued(reports, queued)
    clearQueue()
  }

  const getNextReports = e => {
    e.preventDefault()
    setDataProperty({loading: true})
    getReports(n + 10, allReports)
    setDataProperty({loading: false})
  }

  const onCheck = (e, i) => {
    e.preventDefault()
    setDataProperty({loading: true})
    if (allReports) {
      getReports(n, false)
    }
    else {
      getReports(n, true)
    }
    setDataProperty({loading: false})
  }

  const styles = {
    button: {
      height: 50,
      width: 250,
      margin: 10,
    },
    checkbox: {
      padding: '.5em',
    },
    label: {
      color: 'white',
    },
    checked: {
      fill: 'white'
    },
  }

if (reportErr) {
    return (
      <div className="existingReports">
        <h3>Report loading has failed, sorry!</h3>
        <p>{reportErr}</p>
      </div>
    )
  }
  else if (!reports){
    return (
      <div className="existingReports">
        <h3>There are no reports to view</h3>
      </div>
    )
  }
  else {
    const reportKeys = Object.keys(reports)
                  .map( k => parseInt(k, 10) )
                  .sort( (a, b) => b - a )

    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        <div className="reportList">
        { admin ?
          <Checkbox
            label="Get all team member reports"
            labelStyle={styles.label}
            style={styles.checkbox}
            iconStyle={!allReports ? styles.checked : styles.unchecked}
            checked={allReports}
            onCheck={onCheck}
            /> : '' }
          {reportKeys.map( (k, i) =>
            <ReportItem
              key={i}
              config={reports[k].config}
              report={k}
              index={i}
              queued={queued}
              queueReport={queueReport}
              unqueueReport={unqueueReport}
              />)}
        </div>
        <RaisedButton
          label="download"
          style={styles.button}
          onClick={download}
          />
        <RaisedButton
          label="get next 10 reports"
          style={styles.button}
          onClick={getNextReports}
          />
      </div>
    )
  }
}

const mapStateToProps = state => {

  const { reports, queued, data, user } = state

  const { reportErr } = data.error

  return {
    reports: reports.reports,
    n: reports.n,
    allReports: reports.allReports,
    queued,
    loading: data.loading,
    reportErr,
    admin: user.admin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueReport: report => dispatch(queueReport(report)),
    unqueueReport: index => dispatch(unqueueReport(index)),
    clearQueue: () => dispatch(clearQueue()),
    getReports: (n, allReports) => dispatch(getReports(n, allReports)),
    setDataProperty: property => dispatch(setDataProperty(property)),
  }
}

ExistingReports.propTypes = {
  reports: PropTypes.object,
  n: PropTypes.number,
  allReports: PropTypes.bool,
  queued: PropTypes.array,
  reportErr: PropTypes.string,
  admin: PropTypes.bool,

  queueReport: PropTypes.func,
  unqueueReport: PropTypes.func,
  clearQueue: PropTypes.func,
  getReports: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ExistingReports)
