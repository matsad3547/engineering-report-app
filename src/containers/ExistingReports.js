import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import ReportItem from '../components/ReportItem'

const ReportsDisplay = ({ children, reports, status }) => {

  const firstReport = 0
  const lastReport = 10

  const download = e => {
    e.preventDefault()
  }

  const styles = {
    button: {
      height: 50,
      width: 250,
      margin: 10,
    },
  }

  if (status === 'received') {
    let keys = Object.keys(reports)
    keys = keys.sort( (a, b) => b - a )
    const selectedKeys = keys.slice(firstReport, lastReport)

    return (
      <div className="existingReports">

        {children}
        <h3>Most Recent Reports</h3>
        <div className="reportList">
          {selectedKeys.map( (k, i) =>
            <ReportItem

              key={i}
              report={k}
              index={i}
              />)}
        </div>
        <a href="https://gist.githubusercontent.com/matsad3547/e1675a331b95073d4a22bddf8cc8785a/raw/49af3f939ffaf0928b229f6f4c652555eb64680e/data.csv" download >download</a>
        <RaisedButton
          label="download"
          style={styles.button}
          onClick={download}
          containerElement={ <a href="https://gist.githubusercontent.com/matsad3547/e1675a331b95073d4a22bddf8cc8785a/raw/49af3f939ffaf0928b229f6f4c652555eb64680e/data.csv" download >download</a> }
          />
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

const ExistingReports = connect(
  mapStateToProps,
  )(ReportsDisplay)

export default ExistingReports
