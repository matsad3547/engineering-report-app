import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'


import { queueReport, unqueueReport, clearQueue } from '../../actions/'
import { getReports } from '../../actions/getReports'
import ReportItem from '../../components/ReportItem'
import Loading from '../../components/Loading'
import { downloadQueued } from '../../utils/'

const ExistingReports = ({  reports,
                            n,
                            status,
                            queued,
                            loading,
                            error,
                            queueReport,
                            unqueueReport,
                            clearQueue,
                            getReports,
                          }) => {

  // const firstReport = 0
  // const lastReport = 10

  const download = e => {
    e.preventDefault()
    downloadQueued(reports, queued)
    clearQueue()
  }

  const getNextReports = e => {
    e.preventDefault()
    getReports(n + 10)
  }

  const styles = {
    button: {
      height: 50,
      width: 250,
      margin: 10,
    }
  }
  console.log('reports:', reports);

  if (loading) {
    return (
      <Loading message={'Reports are loading...'}/>
    )
  }
  else if (error.reportErr) {
    return (
      <div className="existingReports">
        <h3>Report loading has failed, sorry!</h3>
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
                  console.log('key length:', reportKeys.length);

    // const selectedKeys = keys.slice(firstReport, lastReport)

    return (
      <div className="existingReports">
        <h3>Most Recent Reports</h3>
        <div className="reportList">
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

  const { reports, queued, data } = state

  return {
    reports: reports.reports,
    n: reports.n,
    queued,
    loading: data.loading,
    error: data.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueReport: report => dispatch(queueReport(report)),
    unqueueReport: index => dispatch(unqueueReport(index)),
    clearQueue: () => dispatch(clearQueue()),
    getReports: n => dispatch(getReports(n)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(ExistingReports)
