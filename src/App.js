import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import { changeVal } from './actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Slider from 'material-ui/Slider'

const getCurrentState = state => state

let App = (state) => {

  const metricValues = getCurrentState(state).metricValues
  // console.log('metric values:', metricValues);
  const keys = Object.keys(metricValues).sort()
  // console.log(keys.sort());

  return (
    <div>
      <MuiThemeProvider>
        <Buttons
          id={keys[0]}
          name={metricValues[keys[0]].name}
          value={metricValues[keys[0]].val}
          />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <SliderInput
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

let Buttons = ({ dispatch, id, name, value }) => {

  const onIncrement = e => {
    e.preventDefault()
    let output = {
      id,
      val: value + 0.25,
      name,
    }
    dispatch(changeVal(output))
  }

  const onDecrement = e => {
    e.preventDefault()
    let output = {
      id,
      val: value - 0.25,
      name,
    }
    dispatch(changeVal(output))
  }


  return (
    <div className="input">
      <div className="metricName">
        <h2>{name}</h2>
      </div>
      <div className="button">
        <FloatingActionButton
          onClick={onIncrement}
          backgroundColor='#F6A10D'>
          +
        </FloatingActionButton>
      </div>
      <div className="valueDisplay">
        <h2>{value.toFixed(2)}</h2>
      </div>
      <div className="button">
        <FloatingActionButton
          onClick={onDecrement}
          backgroundColor='#F6A10D'>
          -
        </FloatingActionButton>
      </div>
    </div>
  )
}

Buttons = connect()(Buttons)

let SliderInput = ({ dispatch, id, name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    console.log('on change value:', input);
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
        max={9}
        defaultValue={4.5}
        onChange={onChange}
        />
    </div>
  )
}

SliderInput = connect()(SliderInput)
