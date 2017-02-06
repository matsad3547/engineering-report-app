import React from 'react';
import './ReportDisplayForm.css'

const ReportDisplayForm = ({  report,
                              config,
                              metricValues,
                              notes }) => {

    const date = report => new Date(+report).toString().slice(0, 24)

  if (!!config) {

    const configVals = Object.keys(config)
    const metricValArr = Object.keys(metricValues)

    return(
      <div className="reportDisplay">
        <h3>Report From {date(report)}</h3>
        <h4>Configuration Values</h4>
        <table>
          <tbody>
            {configVals.map( (val, i) =>
              <tr key={i+'a'}><td key={i+'b'}>{val}:</td>
              <td key={i+'c'}
                className="val">{config[val]}</td>
              </tr>  )}
          </tbody>
        </table>
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

export default ReportDisplayForm

        // {metricValArr.map( (c, i) => <p key={i}>{metricValues[i].name}: {metricValues[i].val}</p>)}
