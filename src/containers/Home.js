import { connect } from 'react-redux'
import UnAuthLanding from '../components/UnAuthLanding/'

const mapStateToProps = (state, ownProps) => {

  return {
    dataset: state.dataset,
    children: ownProps.children,
    location: ownProps.location,
  }
}

const Home = connect(
  mapStateToProps
)(UnAuthLanding)

export default Home
