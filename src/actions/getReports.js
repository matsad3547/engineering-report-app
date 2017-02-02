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

export const getFirstTen = obj => {
  let firstTenObj = []
  let i = 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      while (i < 10) {
        firstTenObj.push(obj[key])
      }
    }
  }
  return firstTenObj
}
