import { connect } from 'react-redux'
import { setUserData, clearUserData } from '../actions/'
import Login from '../components/Login'

const mapStateToProps = state => {

  return {
    email: state.user.email,
    password: state.user.password,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    userDispatch: output => dispatch(setUserData(output)),
    clearUserData: () => dispatch(clearUserData()),
  }
}

const LoginUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

export default LoginUser
