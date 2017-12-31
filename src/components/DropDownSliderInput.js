import React from 'react'
import PropTypes from 'prop-types'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Slider from 'material-ui/Slider'


const DropDownSliderInput = ({id,
                              name,
                              value,
                              previousVal,
                              changeMetricVal,
                            }) => {

  const onChange = (e, input) => {
    const output = {
      id,
      val: input,
      name,
    }
    changeMetricVal(output)
  }

  const styles = {
    label: {
      fontSize: 15,
      padding: '.5em 1em 0 1em',
      lineHeight: 1,
    },
    menu: {
      autoWidth: false,
      margin: 15,
      width: 250,
    },
    customWidth: {
      width: 200,
    },
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

DropDownSliderInput.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.number,
  previousVal: PropTypes.number,
  changeMetricVal: PropTypes.func,
}

export default DropDownSliderInput
