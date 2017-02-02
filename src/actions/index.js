
export const changeMetricVal = ({ id, val, name }) => {
  return {
    type: 'CHANGE_METRIC_VAL',
    id,
    val,
    name,
  }
}

export const saveReportNotes = output => {
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

export const saveReport = output => {
  return {
    type: 'SAVE_REPORT_AND_RESET',
    output,
  }
}

export const selectPage = output => {
  return {
    type:'CHANGE_PAGE',
    output,
  }
}

export const requestReports = ref => {

}

export const receiveReports = reports => {

}
