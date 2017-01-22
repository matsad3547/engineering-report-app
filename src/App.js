import React, { Component } from 'react';
import './App.css';

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
      <JustButtons />
      <ButtonsWithSlider />
    </div>
  )
}

export default App;

const JustButtons = () => {
  return (
    <div>
      <h2>Buttons will go here</h2>
    </div>
  )
}

const ButtonsWithSlider = () => {
  return (
    <div>
      <h2>Buttons with slider will go here</h2>
    </div>
  )
}
