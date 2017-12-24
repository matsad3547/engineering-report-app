import React from 'react'
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import { setReportConfig } from '../actions'
import { configVals } from '../config/'

const ConfigForm = ({ config, configDispatch }) => {

  const {
    model,
    shortName,
    configNum,
    ballast,
  } = config

  const output = {
    model,
    shortName,
    configNum,
    ballast,
  }

  const onChange = {

    model(e) {
      e.preventDefault()
      output.model = e.target.value
      configDispatch(output)
    },
    shortName(e) {
      e.preventDefault()
      output.shortName = e.target.value
      configDispatch(output)
    },
    ballast(e, k, p) {
      e.preventDefault()
      output.ballast = p
      configDispatch(output)
    },
    configNum(e, k, p) {
      e.preventDefault()
      output.configNum = p
      configDispatch(output)
    },
  }

  const styles = {
    config: {
      backgroundColor: 'white',
      height: 30,
      width: 75,
    },
    ballast: {
      backgroundColor: 'white',
      height: 30,
      width: 68,
    },
    label: {
      fontSize: 15,
      lineHeight: 2,
    },
  }

  return (
    <div className="reportConfig">
      <div className="textInput">
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={onChange.model}
          />
      </div>
      <div className="textInput">
        <input
          type="text"
          placeholder="Short Name"
          value={shortName}
          onChange={onChange.shortName}
          />
      </div>
      <div className="muiInput">
        <h4>Config</h4>
        <DropDownMenu
          className="dropdown"
          onChange={onChange.configNum}
          value={configNum}
          labelStyle={styles.label}
          style={styles.config}
          >
          {configVals.map( n => <MenuItem
            key={`config-${n}`}
            primaryText={n}
            label={n}
            value={n}/>)
          }
        </DropDownMenu>
      </div>
      <div className="muiInput">
        <h4>Ballast</h4>
        <DropDownMenu
          className="dropdown"
          onChange={onChange.ballast}
          value={ballast}
          labelStyle={styles.label}
          style={styles.ballast}>
          <MenuItem primaryText={'No'} label={'No'} value={'No'}/>
          <MenuItem primaryText={'Yes'} label={'Yes'} value={'Yes'}/>
        </DropDownMenu>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    configDispatch: (output) => dispatch(setReportConfig(output))
  }
}

export default connect(
  null,
  mapDispatchToProps,
  )(ConfigForm)
