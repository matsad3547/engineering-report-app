import { connect } from 'react-redux'
import Main from '../components/Main/'

const mapStateToProps = (state, ownProps) => {
  return {
    dataset: state.dataset,
    children: ownProps.children,
    location: ownProps.location,
  }
}

const App = connect(
  mapStateToProps
  )(Main)

export default App
