import React from 'react'
import { connect } from 'react-redux'
import './DisplayReport.css'

import { date } from '../../utils/'

const DisplayReport = ({  report,
                          config,
                          metricValues,
                          notes,
                          displayName,
                        }) => {

  if (!!config) {

    const configVals = Object.keys(config)
    const metricValArr = Object.keys(metricValues)

    return(
      <div className="reportDisplay">
        <h3>Report From {date(report)}</h3>

        <table className="author">
          <tbody>            
            <tr>
              <td>Author:</td>
              <td>{displayName ? displayName : '<name is not available>'}</td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <h4>Configuration Values</h4>
        <table>
          <tbody>
            {configVals.map( (val, i) =>
              <tr key={i+'a'}>
                <td key={i+'b'}>{val}:</td>
                <td key={i+'c'}
                className="val">{config[val]}</td>
              </tr>  )}
          </tbody>
        </table>
        <br/>
        <hr/>
        <h4>Metric Values</h4>
        <table>
          <tbody>
            {metricValArr.map( (c, i) =>
              <tr key={i+'a'}><td key={i+'b'}>{metricValues[i].name}:</td>
              <td key={i+'c'}
                className="val">{metricValues[i].val}</td>
              </tr>  )}
          </tbody>
        </table>
        <br/>
        <hr/>
        <h4>Notes</h4>
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

  const reportVals = state.reports.reports[report]

  return {
    report,
    config: reportVals.config,
    metricValues: reportVals.metricValues,
    notes: reportVals.notes,
    displayName: state.user.displayName,
  }
}

export default connect(mapStateToProps)(DisplayReport)
