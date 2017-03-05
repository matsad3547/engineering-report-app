import { connect } from 'react-redux'
import Main from '../components/Main/'

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState,
    children: ownProps.children,
    location: ownProps.location,
  }
}

const App = connect(
  mapStateToProps
  )(Main)

export default App
