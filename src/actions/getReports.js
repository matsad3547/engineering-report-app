
import { requestReports, receiveReports, reportError } from './index'
import database from '../containers/Firebase'
// import firebase from 'firebase'

// const ref = firebase.ref()

export const getFirstTen = obj => {
  let keys = Object.keys(obj)
  // console.log('keys:', keys);
  keys = keys.sort( (a, b) => b - a )
  // console.log('keys sorted:', keys);
  let firstTenObj = []
  let i = 0
  while (i < 10) {
    firstTenObj.push({[keys[i]]: obj[keys[i]]})
    i++
  }
  console.log('first ten reports:', firstTenObj);
  // console.log('obj sorted:', {...obj}.sort( (a, b) => a - b));
  // for (let key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     arrOfObj.push({ [key]: obj[key] })
  //
  //     // if (firstTenObj.length === 10) {
  //     //   return firstTenObj
  //     // }
  //   }
  // }
  // console.log(arrOfObj)
  // arrOfObj = arrOfObj.sort( (a, b) => b. - a )
  // console.log(arrOfObj, 'sorted');
  return firstTenObj
}

export const getReports = (ref, action) => {

  let urlKey = ''
  if (ref === 'reports') {
    urlKey = 'test reports'
  }
  else {
    urlKey = 'test reports/' + ref
  }
  console.log('get reports called');
  return dispatch => {
    dispatch(requestReports());
    return database.ref(urlKey).once('value', snap => {
      const reports = snap.val()
      dispatch(receiveReports(reports))
      })
    .catch( err => {
      console.log('An error occured while querying the database:', err);
      dispatch(reportError(err))
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
