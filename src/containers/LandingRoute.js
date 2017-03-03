import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Home from './Home'


const LandingRoute = () => {
  
  return(
    <Route path="/" component={Home}>

      <IndexRoute component={Home}></IndexRoute>

    </Route>
  )
}

export default LandingRoute
