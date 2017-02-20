import React from 'react';
import { Link } from 'react-router'
import { Tab, Tabs } from 'material-ui/Tabs'

const TabMenu = ({ dataset, pageDisplayed }) => {
  console.log('dataset:', dataset);

  return(
    <Tabs
      value={pageDisplayed}
      >
      <Tab
        label="New Report"
        value={1}
        containerElement={<Link to={`/app/new_report/${dataset}`}/>} />
      <Tab
        label="Existing Reports"
        value={2}
        containerElement={<Link to="/app/existing_reports"/>} />
    </Tabs>
  )
}

export default TabMenu
