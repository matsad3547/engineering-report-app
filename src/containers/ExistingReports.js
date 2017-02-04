import React from 'react';
import { connect } from 'react-redux'

let ExistingReports = ({ reports, status }) => {

  // console.log('reports:', reports);
  // console.log('status at existing reports:', status);
  // console.log('reports at existing reports:', reports);

  if (status === 'received') {
    const keys = reports.map( obj => {
      let keyArr = Object.keys(obj)
      return keyArr[0]
    })
    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        {keys.map( (k, i) => <p key={i}>{Date(k)}</p>)}
        <a href="https://gist.githubusercontent.com/JoniWeiss/e5a4044c9610edc8a0f2c4878539e5fd/raw/edc75a89a6d9f9611bbdf92000245ea9a071cc30/Mac-CLI-Tools.md" download='test.txt'>test download</a>
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

const ReportDisplay = ({ })
