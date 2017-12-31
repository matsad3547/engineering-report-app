import { userKey } from '../utils/auth'

import About from '../components/About'
import UnAuth from '../components/UnAuth'

import App from '../containers/App/'
import Welcome from '../containers/Welcome'
import CreateUser from '../containers/CreateUser'
import CreateTeam from '../containers/CreateTeam'
import Login from '../containers/Login'
import DisplayReport from '../containers/DisplayReport/'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'
import SetKeywords from '../containers/SetKeywords'

const redirectToWelcome = (nextState, replace, cb) => {

  // console.log('user key?', localStorage.getItem(userKey));
  if (localStorage.getItem(userKey)) {
    replace('app/')
    cb()
  }
  else {
    cb()
  }
}

export const routes = [
  {
    path: '/',
    component: UnAuth,
    onEnter: redirectToWelcome,
  },
  {
    path: '/login_user',
    component: Login,
  },
  {
    path: '/create_user',
    component: CreateUser,
  },
  {
    path: '/create_team',
    component: CreateTeam,
  },
  {
    path: '/set_keywords',
    component: SetKeywords,
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
      {
        path: '/app/about',
        component: About,
      },
      {
        path: '/app/set_keywords',
        component: SetKeywords,
      },
    ],
  },
]
