import { connect } from 'react-redux'
import Landing from '../components/Landing/'

const mapStateToProps = (state, ownProps) => {

  return {
    dataset: state.dataset,
    children: ownProps.children,
    location: ownProps.location,
  }
}

const Home = connect(
  mapStateToProps
)(Landing)

export default Home
