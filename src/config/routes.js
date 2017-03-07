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

  const getAuthState = () => new Promise( (resolve, reject) => setTimeout( () => {
    if (store.getState().authState === 'authorized') {
      console.log('authorized');
      resolve('authorized')
    }
    else {
      console.log('fucked');
      reject('nope')
    }
  }, 1000)
)



  const redirectToWelcome = (nextState, replace, next) => {
    // getAuthState()
    //   .then(
    //     () => next(),
    //     () => {
    //       replace('/ua')
    //     }
    //   )
    //   .catch(
    //     () => replace('/ua')
    //   )
    const authState = store.getState().authState
    if (authState === 'authorized') {
      console.log('auth state:', authState);
      console.log('redirecting to login')
      replace({
        pathname: 'app',
        // state: { nextPathname: nextState.location.pathname },
      })
    }

  }

  const routes = [
    // {
    //   path: '/',
    //   component: UnAuthLanding,
    //   // indexRoute: {
    //   //   component: Welcome,
    //   },
    //   onEnter: redirectToWelcome,
    //   childRoutes: [
    //     {
    //       path: '/welcome',
    //       component: Welcome ,
    //     },
    //     {
    //       path: '/new_report',
    //       component: NewReport ,
    //     },
    //     {
    //       path: '/existing_reports',
    //       component: ExistingReports,
    //     },
    //     {
    //       path: '/existing_reports/:report',
    //       component: DisplayReport,
    //     },
    //   ],
    // },
    {
      path: '/',
      component: UnAuthLanding,
      // onEnter: redirectToWelcome,
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
      path: 'app',
      component: App,
      indexRoute: {
        component: Welcome,
      },
      childRoutes: [
        {
          path: '/new_report',
          component: NewReport ,
        },
        {
          path: '/existing_reports',
          component: ExistingReports,
        },
        {
          path: '/existing_reports/:report',
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
