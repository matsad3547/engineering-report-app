import store from '../config/store'

import UnAuthLanding from '../components/UnAuthLanding'
import Welcome from '../components/Welcome'
import App from '../containers/App'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from '../containers/DisplayReport'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

const getRoutes = () => {

  const redirectToWelcome = (nextState, replace) => {
    console.log('redirecting to welcome')
    if (store.getState().authState === 'authorized') {
      replace({
        pathname: '/welcome',
        // state: { nextPathname: nextState.location.pathname}
      })
    }
  }

  const redirectToLogin = (nextState, replace) => {
    console.log('redirecting to login')
    if (store.getState().authState !== 'authorized') {
      replace({
        pathname: '/unauth',
        // state: { nextPathname: nextState.location.pathname },
      })
    }

  }

  // const redirectOnEnter = (nextState, replace) => {
  //   console.log(store.getState().authState || 'nothing');
  //   if (store.getState().authState === 'authorized') {
  //     redirectToWelcome(nextState, replace)
  //   }
  //   else redirectToLogin(nextState, replace)
  // }

  const routes = [
    {
      path: '/unauth',
      component: UnAuthLanding,
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
      path: '/',
      component: App,

      indexRoute: {
        component: Welcome,
      },
      childRoutes: [
        {
          path: 'welcome',
          component: Welcome ,
        },
        {
          path: 'new_report',
          component: NewReport ,
        },
        {
          path: 'existing_reports',
          component: ExistingReports,
        },
        {
          path: 'existing_reports/:report',
          component: DisplayReport,
        },
      ],
    }
  ]

  return routes
}

store.subscribe(
  getRoutes
)

export default getRoutes()
