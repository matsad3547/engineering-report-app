import React from 'react';
import { connect } from 'react-redux'
import { changeVal } from './actions'
// import { initVal } from './reducers'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Tab, Tabs } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import Slider from 'material-ui/Slider'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import RaisedButton from 'material-ui/RaisedButton'

const getCurrentState = state => state

let App = () => {

  var slideIndex = 0

  const handleChange = (value) => {
    console.log('value:', value);
    slideIndex = value
  }
  console.log('slideIndex:', slideIndex);

  return (
    <div className="app">
      <MuiThemeProvider>
        <Tabs onChange={handleChange}>
          <Tab label="New Report" value={0} />
          <Tab label="Existing Reports" value={1} />
        </Tabs>
      </MuiThemeProvider>
      <SwipeableViews
        index={slideIndex}
        onChangeIndex={handleChange}>
        <div>
          <NewReport />
        </div>
        <div>
          <ExistingReports />
        </div>
      </SwipeableViews>
    </div>
  )
}

export default App;

let NewReport = (state) => {

  const metricValues = getCurrentState(state).metricValues
  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

  const styles = {
    button: {
      height: 50,
      margin: 12,
    }
  }

  return (
    <div className="reportInput">

      <NewReportConfigMenu />

      <hr/>

      {keys.map( (key, i) =>
      <MuiThemeProvider
        key={i + 'a'}>
        <DropDownSliderInput
        key={i + 'b'}
        id={key}
        name={metricValues[key].name}
        value={metricValues[key].val}
        />
      </MuiThemeProvider>
      )}
      <NoteField />

      <MuiThemeProvider>
        <RaisedButton
          label="Save Report"
          style={styles.button}
          className="reportButton"
          />
      </MuiThemeProvider>

    </div>
  )
}

NewReport = connect(getCurrentState)(NewReport)

let ExistingReports = () => {
  return (
    <div className="existingReports">
      <h3>Existing Reports Will Go Here</h3>
    </div>
  )
}

let NewReportConfigMenu = () => {
  const styles = {
    menu: {
      backgroundColor: 'white',
      height: 30,
      width: 75,
    },
    label: {
      fontSize: 15,
      lineHeight: 2,
    },
  }
  return (
    <div className="reportConfig">
      <div className="textInput">
        <input type="text" placeholder="Model"></input>
      </div>
      <div className="textInput">
        <input type="text" placeholder="Short Name"></input>
      </div>
      <div className="muiInput">
        <h4>Config</h4>
        <MuiThemeProvider>
          <DropDownMenu
            value={1}
            labelStyle={styles.label}
            style={styles.menu}>
            <MenuItem primaryText={1} label={1} value={1}/>
            <MenuItem primaryText={2} label={2} value={2}/>
            <MenuItem primaryText={3} label={3} value={3}/>
            <MenuItem primaryText={4} label={4} value={4}/>
          </DropDownMenu>
        </MuiThemeProvider>
      </div>
      <div className="muiInput">
        <h4>Ballast</h4>
        <MuiThemeProvider>
          <DropDownMenu
            value={1}
            labelStyle={styles.label}
            style={styles.menu}>
            <MenuItem primaryText={'Yes'} label={'Yes'} value={1}/>
            <MenuItem primaryText={'No'} label={'No'} value={2}/>
          </DropDownMenu>
        </MuiThemeProvider>
      </div>

    </div>
  )
}





let DropDownSliderInput = ({ dispatch, id, name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    let output = {
      id,
      val: input,
      name,
    }
    dispatch(changeVal(output))
  }

  const styles = {
    label: {
      fontSize: 15,
      paddingLeft: 15,
      paddingRight: 15,
      lineHeight: 1,
    },
    menu: {
      autoWidth: false,
      margin: 15,
      width: 250,
    },
    customWidth: {
      width: 200,
    }
  }

  return (
    <div className="input">
      <h2 className="previousVal">4.50</h2>
      <h2>{value.toFixed(2)}</h2>
      <DropDownMenu
        value={1}
        autoWidth={false}
        className="slider"
        labelStyle={styles.label}
        menuStyle={styles.menu}
        style={styles.customWidth}
        >
        <MenuItem
          value={1}
          label={name}
          className="dropDownMenu">
          <h2>{name}</h2>
          <Slider
            step={0.25}
            min={1}
            max={9}
            defaultValue={value}
            onChange={onChange}
            />

        </MenuItem>
      </DropDownMenu>
    </div>
  )
}

DropDownSliderInput = connect()(DropDownSliderInput)

let NoteField = () => {
  return (
    <div>
      <textarea
        name="textArea"
        rows={10}
        placeholder="Note Area"
        >
      </textarea>
    </div>
  )
}
