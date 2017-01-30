
export const changeMetricVal = (output) => {
  return {
    type: 'CHANGE_METRIC_VAL',
    id: output.id,
    val: output.val,
    name: output.name,
  }
}

export const saveReportNotes = (output) => {
  return {
    type: 'SAVE_REPORT_NOTES',
    string: output,
  }
}

export const setNewReportConfig = ({model, shortName, configNum, ballast}) => {
  return {
    type: 'SET_NEW_REPORT_CONFIG',
    model,
    shortName,
    configNum,
    ballast,
  }
}
