import store from '../config/store'

import UnAuthLanding from '../components/UnAuthLanding'
// import Home from '../containers/Home'
import App from '../containers/App'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from '../containers/DisplayReport'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

const getRoutes = () => {

  const authState = store.getState().authState
  console.log('auth state:', authState);

  const redirectToLogin = (nextState, replace) => {
    if (authState !== 'authorized') {
      replace({
        pathname: '/unauth',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  const redirectToWelcome = (nextState, replace) => {
   if (authState === 'authorized') {
     replace('/')
   }
  }

  const routes = [
    {
      onEnter: redirectToWelcome,
      component: App,
      childRoutes: [
        { path: 'new_report', component: NewReport },
        { path: 'existing_reports', component: ExistingReports },
        { path: 'existing_reports/:report', component: DisplayReport },
      ]
    },
    {
      onEnter: redirectToLogin,
      component: UnAuthLanding,
    },
    {
      path: '/unauth',
      component: UnAuthLanding,
      indexRoute: { component: UnAuthLanding },
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
      childRoutes: [
        { path: 'new_report', component: NewReport },
        { path: 'existing_reports', component: ExistingReports },
        { path: 'existing_reports/:report', component: DisplayReport },
      ]
    },
  ]

  return routes
}

store.subscribe(
  getRoutes
)

export default getRoutes()
