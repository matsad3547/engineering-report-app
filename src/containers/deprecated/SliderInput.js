let SliderInput = ({ dispatch, id, name, value }) => {

  const onChange = (e, input) => {
    e.preventDefault()
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

<MuiThemeProvider>
  <DropDownSliderInput
    id={keys[1]}
    name={metricValues[keys[1]].name}
    value={metricValues[keys[1]].val}
    />
</MuiThemeProvider>
