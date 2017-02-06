import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

const ReportItem = ({ report, index }) => {

  // const media = media
  // const checked = checked

  const date = report => new Date(+report).toString().slice(0, 24)

  const onCheck = e => {
    e.preventDefault()
    console.log('toggle value:', e.target.value)
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
      <p>{`${index + 1}: `}{ date(report) }</p>
      <Checkbox
        label="Select to Download"
        onCheck={onCheck}
        style={styles.checkbox}
        value={report}
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
