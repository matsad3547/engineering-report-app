import { connect } from 'react-redux'
import { setUserData, clearUserData } from '../actions/'
import SignUp from '../components/SignUp'

const mapStateToProps = state => {

  return {
    email: state.user.email,
    password: state.user.password,
    verified: state.user.verified,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    userDispatch: output => dispatch(setUserData(output)),
    clearUserData: () => dispatch(clearUserData()),
  }
}

const CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(SignUp)

export default CreateUser
