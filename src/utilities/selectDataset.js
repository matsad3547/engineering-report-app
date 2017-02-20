import store from '../containers/store'
import { selectDataset } from './auth'
import { getReports } from '../actions/getReports'
import { getKeywords } from '../actions/getKeywords'

const dataset =
console.log('dataset:', dataset);

store.dispatch(getReports(dataset))
store.dispatch(getKeywords(dataset))

const selectDataset = () => new Promise( resolve => resolve )





const wait = time => new Promise((resolve) => setTimeout(resolve, time))

wait(3000)
  .then( () => console.log('hello') )
  .catch( err => console.log('there was an error:', err) )
