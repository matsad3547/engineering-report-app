import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Slider from 'material-ui/Slider'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const App = () => {
  return (
    <div>
      <MuiThemeProvider>
        <Buttons />
      </MuiThemeProvider>
      <MuiThemeProvider>
        <SliderInput />
      </MuiThemeProvider>
    </div>
  )
}

export default App;

const Buttons = () => {
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
        <h2>value goes here</h2>
      </div>
      <div>
        <FloatingActionButton>
          -
        </FloatingActionButton>
      </div>
    </div>
  )
}

const SliderInput = () => {
  return (
    <div className="input">
      <div className="metricName">
        <h2>Metric Name 2: value goes here</h2>
      </div>
      <Slider
        className="slider"
        step={0.25}
        max={9}
        defaultValue={4.5}
        />
    </div>
  )
}
