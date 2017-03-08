import store from '../config/store'

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
      }, 300)

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
