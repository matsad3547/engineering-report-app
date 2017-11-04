export const version = '0.1.2'

export const muiTheme = {
  palette: {
    primary1Color: '#FF9800',
    primary2Color: '#FF5722',
    primary3Color: '#FFE0B2',
    accent1Color: '#FF5722',
    accent2Color: '#757575',
    accent3Color: '#FF5722',
  }
}

export const initVal = 5

export const initReportConfig = {
  model: '',
  shortName: '',
  configNum: 1,
  ballast: 'No',
}

export const initReports = {
  n: 0,
  reports: [],
  allReports: false,
}

export const initUserState = {
  displayName: '',
  email: '',
  uid: null,
  password: '',
  verifyPassword: '',
  admin: false,
  approved: false,
  teams: [],
  team: 'demo',
}

export const initDataState = {
  dataIsFresh: false,
  loading: false,
  error: {},
}

export const initTeamState = {
  team: '',
  keyword: '',
  keywords: [],
}
