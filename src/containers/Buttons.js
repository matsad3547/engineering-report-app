import FloatingActionButton from 'material-ui/FloatingActionButton'

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


// <MuiThemeProvider>
//   <Buttons
//     id={keys[0]}
//     name={metricValues[keys[0]].name}
//     value={metricValues[keys[0]].val}
//     />
// </MuiThemeProvider>
