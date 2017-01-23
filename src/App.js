import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Slider from 'material-ui/Slider'

const getCurrentState = state => state

// onChange = connect()(onChange)

let App = (state) => {

  const metricValues = getCurrentState(state).metricValues

  return (
    <div>
      <MuiThemeProvider>
        <Buttons
          value={metricValues.metricName1.val}
          />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <SliderInput
          value={metricValues.metricName2.val}

          />
      </MuiThemeProvider>
    </div>
  )
}

App = connect(getCurrentState)(App)

export default App;

const Buttons = ({ name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    console.log('on change value:', input);
  }
  // injectTapEventPlugin()
  return (
    <div className="input">
      <div className="metricName">
        <h2>Metric Name 1</h2>
      </div>
      <div>
        <FloatingActionButton>
          +
        </FloatingActionButton>
      </div>
      <div>
        <h2>{value}</h2>
      </div>
      <div>
        <FloatingActionButton>
          -
        </FloatingActionButton>
      </div>
    </div>
  )
}

const SliderInput = ({ name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
    console.log('on change value:', input);
  }

  return (
    <div className="input">
      <div className="metricName">
        <h2>Metric Name 2: {value}</h2>
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
