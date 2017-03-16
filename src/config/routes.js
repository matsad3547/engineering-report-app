import store from '../config/store'
import { connect } from 'react-redux'

import UnAuth from '../components/UnAuth'
import Welcome from '../components/Welcome'
import App from '../containers/App'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from '../containers/DisplayReport'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

const getRoutes = () => {

  const redirectToWelcome = (nextState, replace, cb) => {
    // let i = 0
    // while (store.getState().authState.length === 0) {
    //   setTimeout(null, 10)
    //   i++
    //   console.log(i);
    // }
    // if (store.getState().authState === 'authorized') {
    //   console.log('redirecting to welcome')
    //   replace('app/')
    //   cb()
    // }
    // console.log('time elapsed =', (i / 1000).toFixed(2))

    setTimeout(
      () => {
        console.log('enter timeout')
        const { authState } = store.getState()
        if (authState === 'authorized') {
            console.log('if auth state:', authState)
            console.log('redirecting to login')
            replace('app/')
          }
        cb()
      }, 500)

  }

  const routes = [

    {
      path: '/',
      component: UnAuth,
      onEnter: redirectToWelcome,
    },
    {
      path: '/login_user',
      component: LoginUser,
    },
    {
      path: '/create_user',
      component: CreateUser,
    },
    {
      path: 'app/',
      component: App,
      indexRoute: {
        component: Welcome,
      },
      childRoutes: [
        {
          path: '/app/new_report',
          component: NewReport ,
        },
        {
          path: '/app/existing_reports',
          component: ExistingReports,
        },
        {
          path: '/app/existing_reports/:report',
          component: DisplayReport,
        },
      ],
    },
  ]

  return routes
}

store.subscribe(
  getRoutes
)

export default getRoutes()
// export default connect(state => state.authState)(getRoutes)
