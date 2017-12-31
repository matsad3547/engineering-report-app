import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

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
    }
  }
  return (

    <Snackbar
      open={error ? true : false}
      message={message}
      onRequestClose={ clearError }
      bodyStyle={styles.body}
      contentStyle={styles.content}
      />
  )
}

ErrorPopUp.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  clearError: PropTypes.func.isRequired
}

export default ErrorPopUp
