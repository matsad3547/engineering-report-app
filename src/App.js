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
        <h1>Test Report App</h1>
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
// <MuiThemeProvider>
//   <DropDownSliderInput
//     id={keys[1]}
//     name={metricValues[keys[1]].name}
//     value={metricValues[keys[1]].val}
//     />
// </MuiThemeProvider>

App = connect(getCurrentState)(App)

export default App;

// let SliderInput = ({ dispatch, id, name, value }) => {
//
//   const onChange = (e, input) => {
//     e.preventDefault()
//     let output = {
//       id,
//       val: input,
//       name,
//     }
//     dispatch(changeVal(output))
//   }
//
//   return (
//     <div className="input">
//       <div className="metricName">
//         <h2>{name}: {value.toFixed(2)}</h2>
//       </div>
//       <Slider
//         className="slider"
//         step={0.25}
//         min={1}
//         max={9}
//         defaultValue={initVal}
//         onChange={onChange}
//         />
//     </div>
//   )
// }
//
// SliderInput = connect()(SliderInput)

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
    },
    menu: {
      width: 250,
    },
    customWidth: {
      // marginLeft: 0,//effects dropped down menu
      fontSize: 20,
      paddingLeft: 0,
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
        style={styles.customWidth}
        >
        <MenuItem
          value={1}
          primaryText={ name +': ' + value.toFixed(2)}
          className="dropDownMenu">
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
