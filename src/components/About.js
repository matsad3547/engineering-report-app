import React from 'react'
import { version } from '../config/'

const About = () => (
  
  <div className="color flexLayout about">
    <h3>Engineering Report App</h3>
    <p>Built to help test engineers in the field.</p>
    <br/>
    <p>version {version}</p>
    <br/>
    <p>See the latest changes <a href="https://github.com/matsad3547/engineering-report-app/blob/master/README.md" target="_blank" rel="noopener noreferrer">here</a>!</p>
    <br/>
    <p>Please log any bugs or request features <a href="https://github.com/matsad3547/engineering-report-app/issues" target="_blank" rel="noopener noreferrer">here</a></p>
  </div>
)

export default About
