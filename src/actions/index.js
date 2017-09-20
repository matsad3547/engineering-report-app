
export const changeMetricVal = ({ id, val, name }) => ({
  type: 'CHANGE_METRIC_VAL',
  id,
  val,
  name,
})

export const saveReportNotes = output => ({
  type: 'SAVE_REPORT_NOTES',
  string: output,
})

export const setReportConfig = ({model, shortName, configNum, ballast}) => ({
  type: 'SET_NEW_REPORT_CONFIG',
  model,
  shortName,
  configNum,
  ballast,
})

export const saveReport = output => ({
  type: 'SAVE_REPORT_AND_RESET',
  output,
})

export const requestReports = () => ({
  type: 'REPORTS_REQUESTED',
})

export const receiveReports = reports => ({
  type: 'REPORTS_RECEIVED',
  reports,
})

export const reportError = error => ({
  type: 'REPORTS_ERRORED',
  error,
})

export const queueReport = report => ({
  type: 'QUEUE_REPORT',
  report,
})

export const unqueueReport = index => ({
  type: 'UNQUEUE_REPORT',
  index,
})

export const clearQueue = () => ({
  type: 'CLEAR_QUEUE',
})

export const setUserData = ({ email,
                              password,
                              verified,
                              uid,
                              displayName,
                              team,
                            }) => ({
  type: 'SET_USER_DATA',
  email,
  password,
  verified,
  uid,
  displayName,
  team,
})

export const setUserProperty = (property) => {
  const key = Object.keys(property)[0]
  return {
    type: 'SET_USER_PROPERTY',
    [key]: property[key],
  }
}

export const clearUserData = () => ({
  type: 'CLEAR_USER_DATA',
})

export const requestKeywords = () => ({
  type: 'REQUEST_KEYWORDS',
})

export const receiveKeywords = keywords => ({
  type: 'KEYWORDS_RECEIVED',
  keywords,
})

export const keywordError = error => ({
  type: 'KEYWORDS_ERRORED',
  error,
})

export const setAuthState = authState => ({
  type: 'SET_AUTH_STATE',
  authState,
})
