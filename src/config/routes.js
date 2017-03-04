// import { connect } from 'react-redux'
import store from '../containers/store'

import Home from '../containers/Home'
import App from '../containers/App'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from '../containers/DisplayReport'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

const redirectToLogin = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const redirectToDashboard = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace('/')
  }
}

store.subscribe( () => console.log(store.getState().authState) )

const routes = [
  {
    path: '/',
    component: Home,
    indexRoute: { component: Home },
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
    path: '/app',
    component: App,
    childRoutes: [
      { path: 'new_report', component: NewReport },
      { path: 'existing_reports', component: ExistingReports },
      { path: 'existing_reports/:report', component: DisplayReport },
    ]
  },
]

export default routes
