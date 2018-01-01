import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import { setDataMessage } from '../actions/'

const MessagePopUp = ({ message,
                        clearMessage,
                    }) => {
  const styles = {
    content: {
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
      open={message ? true : false}
      message={message}
      onRequestClose={clearMessage}
      autoHideDuration={6000}
      bodyStyle={styles.body}
      contentStyle={styles.content}
      />
  )
}

MessagePopUp.propTypes = {
  message: PropTypes.string,
  clearMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  message: state.data.message,
})

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch(setDataMessage('')),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagePopUp)
