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

//   const getAuthState = () => new Promise( (resolve, reject) => () => {
//     if (store.getState().authState === 'authorized') {
//       console.log('authorized');
//       resolve('authorized')
//     }
//     else {
//       console.log('fucked');
//       reject('nope')
//     }
//   }
// )

  const redirectToWelcome = (nextState, replace) => {

    const authState = store.getState().authState
    // const getAuthState = () => {
    //   // const authState = store.getState().authState
    //   if (!store.getState().authState) {
    //     setTimeout(getAuthState, 50)
    //   }
    //   else return store.getState().authState
    // }
    //
    // const authState = getAuthState()
    console.log('authState:', authState );


      // setTimeout( () => {
      //   authState = store.getState().authState
      //   console.log('auth state:', authState)
      // }, 250)


    if (authState === 'authorized') {
      console.log('if auth state:', authState)
      console.log('redirecting to login')
      replace('/app')
    }
  }

  const routes = [

    {
      path: '/',
      component: UnAuthLanding,
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
