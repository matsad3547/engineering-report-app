import React from 'react';
import { Link } from 'react-router'
import './home.css'

const Home = () => {

  return (
    <div className="home">
      <h1>Engineering Report App</h1>
      <h2>This will be the landing page</h2>
      <h3>It will contain:</h3>
      <ul>
        <li>Sign-In for Authorized Users</li>
        <li>A Demo Version of the App</li>
      </ul>
      <ul>
        <li>
          <Link to="/app" >Try out the App</Link>
        </li>
        <li>
          <Link to="/app/existing_reports" >Reports</Link>
        </li>
      </ul>
    </div>
  )
}


export default Home
