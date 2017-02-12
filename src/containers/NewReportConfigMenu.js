import { connect } from 'react-redux'

import { setReportConfig } from '../actions'

import ConfigForm from '../components/ConfigForm'

const mapDispatchToProps = dispatch => {
  return {
    configDispatch: (output) => dispatch(setReportConfig(output))
  }
}

const NewReportConfigMenu = connect(
  null,
  mapDispatchToProps,
  )(ConfigForm)

export default NewReportConfigMenu
