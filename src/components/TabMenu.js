import React from 'react';
import { Link } from 'react-router'
import { Tab, Tabs } from 'material-ui/Tabs'

const TabMenu = ({ dataset, pageDisplayed }) => {

  return(
    <Tabs
      value={pageDisplayed}
      >
      <Tab
        label="New Report"
        value={1}
        containerElement={<Link to={`new_report`}/>} />
      <Tab
        label="Existing Reports"
        value={2}
        containerElement={<Link to="existing_reports"/>} />
    </Tabs>
  )
}

export default TabMenu
