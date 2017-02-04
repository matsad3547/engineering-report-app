import React from 'react';
import { connect } from 'react-redux'

let ExistingReports = ({ reports, status }) => {

  const firstReport = 0
  const lastReport = 10

  if (status === 'received') {
    let keys = Object.keys(reports)
    keys = keys.sort( (a, b) => b - a )
    const selectedKeys = keys.slice(firstReport, lastReport)
    const date = k => new Date(+k).toString().slice(0, 24)

    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        {selectedKeys.map( (k, i) => <p key={i}>{`${i + 1}: `}{ date(k) }</p>)}
        <a href="https://gist.githubusercontent.com/matsad3547/e1675a331b95073d4a22bddf8cc8785a/raw/49af3f939ffaf0928b229f6f4c652555eb64680e/data.csv" download >Download Test</a>
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
