import React from 'react';
import { connect } from 'react-redux'


const ReportDisplayForm = ({  report,
                              config,
                              metricValues,
                              notes }) => {

  // const keys = Object.keys(config)
  // console.log('params at DisplayReport:', params.report);

  // const report = report ? report : 'test'
    const date = report => new Date(+report).toString().slice(0, 24)

  if (!!config) {

    const configVals = Object.keys(config)


    console.log('metric vals:', metricValues);

    return(
      <div className="reportDisplay">
        <h4>Report From {date(report)}</h4>
        <h5>Configuration Values</h5>
        {configVals.map( (val, i) => <p key={i}>{val}: {config[val]}</p>)}
        <hr/>
        <h5>Metric Values</h5>
        {Array(17).map( i => <p key={i}> {metricValues[i].name}: {metricValues[i].val}</p>)}
        <h5>Notes</h5>
        <p>{notes}</p>
      </div>
    )
  }
  return (

    <div className="reportDisplay">
      <h4>Report From {date(report)} is loading...</h4>
    </div>
  )

}


const mapStateToProps = (state, ownProps) => {

  const report = ownProps.params.report

  if (state.reports.status === 'received') {

    const reportVals = state.reports.reports[report]

    return {
      report,
      config: reportVals.config,
      metricValues: reportVals.metricValues,
      notes: reportVals.notes,
    }
  }

  return {}

}

const DisplayReport = connect(mapStateToProps)(ReportDisplayForm)

export default DisplayReport
