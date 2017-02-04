import { connect } from 'react-redux'

import { setNewReportConfig } from '../actions'

import ConfigForm from '../components/ConfigForm'

const mapDispatchToProps = dispatch => {
  return {
    configDispatch: (output) => dispatch(setNewReportConfig(output))
  }
}

const NewReportConfigMenu = connect(
  null,
  mapDispatchToProps,
  )(ConfigForm)

export default NewReportConfigMenu
