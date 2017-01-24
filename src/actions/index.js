

export const changeVal = (output) => {
  // console.log('action output:', output);
  return {
    type: 'CHANGE_VAL',
    id: output.id,
    val: output.val,
    name: output.name,
  }
}
