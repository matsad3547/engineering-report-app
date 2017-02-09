import React from 'react';
import { Link } from 'react-router'
import { Tab, Tabs } from 'material-ui/Tabs'

const TabMenu = ({ pageDisplayed }) => {

  return(
    <Tabs
      value={pageDisplayed}
      >
      <Tab
        label="New Report"
        value={1}
        containerElement={<Link to="/app/new_report"/>} />
      <Tab
        label="Existing Reports"
        value={2}
        containerElement={<Link to="/app/existing_reports"/>} />
    </Tabs>
  )
}

export default TabMenu
