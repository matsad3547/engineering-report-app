import { requestReports, receiveReports } from './index'

export const getReports = ref => {
  return dispatch(requestReports(ref));
  let urlKey = ''
  if (ref === 'reports') {
    urlKey = 'test reports'
  }
  else {
    urlKey = 'test reports/' + ref
  }
  const key = 'https://engineering-report-app.firebaseio.com/'+ urlKey
  return fetch(key)
    .then( response => getFirstTenReports(response))
    .then( firstTen => dispatch(recieveReports(firstTen)))
    .catch( err => console.log('there was an error:', err))
}

const getFirstTen = obj => {
  let firstTenObj = []
}
