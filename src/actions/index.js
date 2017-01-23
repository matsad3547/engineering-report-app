

export const changeVal = (input) => {
  console.log('action input:', input);
  return {
    type: 'CHANGE_VAL',
    [input.metricName]: {
      val: input.val
    }
  }
}
