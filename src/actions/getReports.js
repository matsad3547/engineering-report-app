
import { requestReports, receiveReports, reportError } from './index'
import database from '../containers/Firebase'


export const getReports = (ref, action) => {

  let urlKey = ''
  if (ref === 'reports') {
    urlKey = 'test reports'
  }
  else {
    urlKey = 'test reports/' + ref
  }
  console.log('url key:', urlKey);

  return dispatch => {
    dispatch(requestReports());
    console.log('get reports is getting tested');
    return database.ref(urlKey).once('value', snap => {
      const reports = snap.val()
      console.log('reports:', reports);
      dispatch(receiveReports(reports))
    })
    .catch( err => {
      console.log('An error occured while querying the database:', err);
      dispatch(reportError())
    })
  }

  // const key = 'https://engineering-report-app.firebaseio.com/'+ urlKey
  // return fetch(key)
  //   .then( response => {
  //     console.log('response from firebase', getFirstTen(response));
  //
  //     getFirstTen(response)
  //   })
  //   .catch( err => console.log('there was an error:', err))
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
