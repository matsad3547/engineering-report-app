import store from '../config/store'

import UnAuth from '../components/UnAuth'
import Welcome from '../components/Welcome'
import About from '../components/About'
import App from '../containers/App/'
import CreateUser from '../containers/CreateUser'
import Login from '../containers/Login'
import DisplayReport from '../containers/DisplayReport/'
import NewReport from '../containers/NewReport'
import ExistingReports from '../containers/ExistingReports/'

const getRoutes = () => {

  const redirectToWelcome = (nextState, replace, cb) => {

    const intervalTime = 50

    const maxTime = 5000

    let times = 0

    const waitForStore = setInterval(
      () => {
        console.log('entering timeout');
        times++
        const { authState } = store.getState()

        if ((times * intervalTime) > maxTime) {
          cb()
          clearInterval(waitForStore)
        }

        else if (authState === 'authorized') {
          replace('app/')
          cb()
          clearInterval(waitForStore)
        }
        else if (authState === 'demo') {
          cb()
          clearInterval(waitForStore)
        }
    }, intervalTime)
  }

  const routes = [

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
      ],
    },
  ]

  return routes
}

store.subscribe(
  getRoutes
)

export default getRoutes()
