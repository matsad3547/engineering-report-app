
import Home from '../containers/Home'
import App from '../containers/App'
import CreateUser from '../containers/CreateUser'
import LoginUser from '../containers/LoginUser'
import DisplayReport from '../containers/DisplayReport'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

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
