export const version = '0.1.14'

export const muiTheme = {
  palette: {
    primary1Color: '#FF9800',
    primary2Color: '#FF5722',
    primary3Color: '#FFE0B2',
    accent1Color: '#FF5722',
    accent2Color: '#757575',
    accent3Color: '#FF5722',
  },
}

export const initVal = 5

export const initReportConfig = {
  model: '',
  shortName: '',
  configNum: 1,
  ballast: 'No',
}

export const configOrder = ['m', 's', 'c', 'b',]

export const initReports = {
  n: 0,
  reports: null,
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
  teammates: null,
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

export const configVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
