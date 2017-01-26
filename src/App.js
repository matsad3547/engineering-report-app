import React from 'react';
import { connect } from 'react-redux'
import { changeVal } from './actions'
// import { initVal } from './reducers'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Slider from 'material-ui/Slider'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

const getCurrentState = state => state

let App = (state) => {

  const metricValues = getCurrentState(state).metricValues
  const keys = Object.keys(metricValues).sort( (a, b) => a - b)

  return (
    <div className="reportInput">
      <div className="title">
        <h3>New Report Screen</h3>
      </div>
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
    </div>
  )
}

App = connect(getCurrentState)(App)

export default App;

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
      fontSize: 20,
      paddingLeft: 15,
      paddingRight: 15,
      lineHeight: 1,
    },
    menu: {
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
