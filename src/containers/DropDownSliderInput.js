import React from 'react';
import { connect } from 'react-redux'

import { changeMetricVal } from '../actions'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Slider from 'material-ui/Slider'


const DropDownSliderInput = ({ dispatch, id, name, value, previousVal }) => {

  const onChange = (e, input) => {
    e.preventDefault() //line 558
    let output = {
      id,
      val: input,
      name,
    }
    dispatch(changeMetricVal(output))
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
      <h2 className="previousVal">{previousVal.toFixed(2)}</h2>
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

export default connect()(DropDownSliderInput)
