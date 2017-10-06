import {  setUserProperty,
          setDataProperty,
          setDataError,
        } from './index'

import database from '../utils/firebase'

export const getTeams = () => {

  return dispatch => {
    dispatch(setDataProperty({dataIsFresh: false}))
    dispatch(setDataProperty({loading: true}))
    return database.ref('teams/')
            .once('value', snap => {
      const teams = Object.keys(snap.val())
                      .filter( t => t !== 'demo' )
      console.log('teams:', teams);
      dispatch(setUserProperty({teams,}))
      dispatch(setDataProperty({loading: false}))
      dispatch(setDataProperty({dataIsFresh: true}))
      })
    .catch( err => {
      console.error('An error occured while fetching teams from the database:', err);
      dispatch(setDataError({teamsErr: err}))
    })
  }
}
