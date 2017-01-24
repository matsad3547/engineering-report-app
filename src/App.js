import React from 'react';
import { connect } from 'react-redux'
import { changeVal } from './actions'
import { initVal } from './reducers'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Slider from 'material-ui/Slider'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const getCurrentState = state => state

let App = (state) => {

  const metricValues = getCurrentState(state).metricValues
  // console.log('metric values:', metricValues);
  const keys = Object.keys(metricValues).sort()
  // console.log(keys.sort());

  return (
    <div className="reportInput">
      <div className="title">
        <h1>Test Report App</h1>
      </div>
      <MuiThemeProvider>
        <SliderInput
          id={keys[0]}
          name={metricValues[keys[0]].name}
          value={metricValues[keys[0]].val}
          />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <DropDownSliderInput
          id={keys[1]}
          name={metricValues[keys[1]].name}
          value={metricValues[keys[1]].val}
          />
      </MuiThemeProvider>
    </div>
  )
}

App = connect(getCurrentState)(App)

export default App;

let SliderInput = ({ dispatch, id, name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    // console.log('on change value:', input);
    let output = {
      id,
      val: input,
      name,
    }
    dispatch(changeVal(output))
  }

  return (
    <div className="input">
      <div className="metricName">
        <h2>{name}: {value.toFixed(2)}</h2>
      </div>
      <Slider
        className="slider"
        step={0.25}
        min={1}
        max={9}
        defaultValue={initVal}
        onChange={onChange}
        />
    </div>
  )
}

SliderInput = connect()(SliderInput)

let DropDownSliderInput = ({ dispatch, id, name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    // console.log('on change value:', input);
    let output = {
      id,
      val: input,
      name,
    }
    dispatch(changeVal(output))
  }

  const styles = {
    label: {
      fontSize: 25,
    },
    menuItem: {
      height: 50,
      backgroundColor: '#333',
    },
    menu: {
      width: 250,

    }
  }

  return (
    <div className="input">
      <DropDownMenu
        value={1}
        autoWidth={false}
        className="slider"
        labelStyle={styles.label}
        menuStyle={styles.menu}
        style={styles.menu}
        >
        <MenuItem
          value={1}
          primaryText={ name +': ' + value.toFixed(2)}
          menuItemStyle={styles.menuItem}
          className="dropDownMenu"><strong>          
          <Slider
            step={0.25}
            min={1}
            max={9}
            defaultValue={initVal}
            onChange={onChange}
            />
          </strong>
        </MenuItem>
      </DropDownMenu>
    </div>
  )
}

DropDownSliderInput = connect()(DropDownSliderInput)
