import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

const ReportItem = ({ config,
                      report,
                      index,
                      queued,
                      queueReport,
                      unqueueReport, }) => {

  const { model, shortname, configNum } = config

  const checked = queued.includes(report) ? true : false

  // const date = report => new Date(+report)
  //                             .toString()
  //                             .slice(0, 24)

  const onCheck = (e, i) => {
    e.preventDefault()
    if (checked) {
      let index = queued.indexOf(report)
      unqueueReport(index)
    }
    else queueReport(report)
  }

  const styles = {
    button: {
      height: 25,
      width: 125,
    },
    checkbox: {
      marginBottom: 5,
    },
  }

  return (
    <div className="reportItem">
      <p>{`${index + 1}. `}{model || '<model>'}: configuration {configNum || '<#>'}</p>

      <p>{shortname || '<discription>'}</p>
      <Checkbox
        label="Select to Download"
        style={styles.checkbox}
        checked={checked}
        onCheck={onCheck}
        />
      <div className="download">
      </div>
      <RaisedButton
        containerElement={<Link to={`/app/existing_reports/${report}`}/>}
        label="View Report"
        style={styles.button}
        className="reportButton"
        />
    </div>
  )
}

export default ReportItem
