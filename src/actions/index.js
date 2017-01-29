
export const changeMetricVal = (output) => {
  return {
    type: 'CHANGE_METRIC_VAL',
    id: output.id,
    val: output.val,
    name: output.name,
  }
}
