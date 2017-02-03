
// import { requestReports, receiveReports } from './index'


export const getReports = (ref, action) => {


  // const dispatch = store.dispatch
  // return dispatch(requestReports(ref));
  let urlKey = ''
  if (ref === 'reports') {
    urlKey = 'test reports'
  }
  else {
    urlKey = 'test reports/' + ref
  }
  console.log('url key:', urlKey);
  const key = 'https://engineering-report-app.firebaseio.com/'+ urlKey
  return fetch(key)
    .then( response => {
      console.log('response from firebase', getFirstTen(response));
      getFirstTen(response)
    })
    .catch( err => console.log('there was an error:', err))
}

export const getFirstTen = obj => {
  let firstTenObj = []
  let i = 0
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      firstTenObj.push({ [key]: obj[key] })
      if (firstTenObj.length === 10) {
        return firstTenObj
      }
    }
  }
  return firstTenObj
}
