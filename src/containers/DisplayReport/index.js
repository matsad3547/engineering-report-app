import React from 'react'
import { connect } from 'react-redux'
import './DisplayReport.css'

import { date } from '../../utils/'

const DisplayReport = ({  report,
                          config,
                          metricValues,
                          notes,
                          displayName,
                          team,
                        }) => {
  if (!!config) {

    const metricValArr = Object.keys(metricValues)

    return(
      <div className="reportDisplay">
        <h3>Report From {date(report)}</h3>

        { team !== 'demo' ?
          <div>
            <table className="author">
              <tbody>
                <tr>
                  <td>Author:</td>
                  <td>{displayName ? displayName : '<name is not available>'}</td>
                </tr>
              </tbody>
            </table>
            <hr/>
          </div> : ''}
        <h4>Configuration Values</h4>
        <table>
          <tbody>
            <tr>
              <td>model:</td>
              <td className="val">{config.model}</td>
            </tr>
            <tr>
              <td>description:</td>
              <td className="val">{config.shortName}</td>
            </tr>
            <tr>
              <td>config:</td>
              <td className="val">{config.configNum}</td>
            </tr>
            <tr>
              <td>ballast:</td>
              <td className="val">{config.ballast}</td>
            </tr>
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

  const reportVals =  state.reports.reports ?
   state.reports.reports[report] : null

  return {
    report,
    config: reportVals ? reportVals.config : null,
    metricValues: reportVals ? reportVals.metricValues : null,
    notes: reportVals ? reportVals.notes : null,
    displayName: state.user.displayName,
    team: state.user.team,
  }
}

export default connect(mapStateToProps)(DisplayReport)
