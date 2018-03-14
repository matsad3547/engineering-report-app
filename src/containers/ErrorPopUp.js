import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from 'material-ui/Snackbar'

import { setDataError } from '../actions/'

const ErrorPopUp = ({ error,
                      message,
                      clearError,
                    }) => {
  const styles = {
    content: {
      color: '#BD0000',
      lineHeight: '2em'
    },
    body: {
      height: 'auto',
      textAlign: 'center',
      padding: '.5em',
      backgroundColor: '#363636',
    }
  }
  return (

    <Snackbar
      open={!!error}
      message={`${message}: ${error}`}
      onRequestClose={ clearError }
      bodyStyle={styles.body}
      contentStyle={styles.content}
      />
  )
}

ErrorPopUp.propTypes = {
  errorKey: PropTypes.string,
  message: PropTypes.string,
  clearError: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {

  const {
    errorKey,
    message,
  } = ownProps

  return {
    error: state.data.error[errorKey] ? state.data.error[errorKey].message : undefined,
    message,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const { errorKey } = ownProps

  return {
    clearError: () =>  dispatch(setDataError({[errorKey]: null})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorPopUp)
