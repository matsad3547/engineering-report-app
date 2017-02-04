import React from 'react';
import { connect } from 'react-redux'

let ExistingReports = ({ reports, status }) => {

  const firstReport = 0
  const lastReport = 10

  if (status === 'received') {
    let keys = Object.keys(reports)
    keys = keys.sort( (a, b) => b - a )
    const selectedKeys = keys.slice(firstReport, lastReport)
    const date = k => new Date(+k).toString()

    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        {selectedKeys.map( (k, i) => <p key={i}>{ date(k) }</p>)}
      </div>
    )

  }
  else if (status === 'errored') {
    return (
      <div className="existingReports">
        <h3>Report loading has failed, sorry!</h3>
      </div>
    )
  }
  return (
    <div className="existingReports">
      <h3>Reports are loading...</h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reports: state.reports.reports,
    status: state.reports.status,
  }
}

ExistingReports = connect(
  mapStateToProps,
  )(ExistingReports)

export default ExistingReports

// const ReportDisplay = ({ })
