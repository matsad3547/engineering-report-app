import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

import { arrEqualsArr } from '../utils/'

import database from '../utils/firebase'

import {
  setTeamProperty,
  setTeamKeyword,
  setDataProperty,
  setDataMessage,
} from '../actions/'

import getKeywords from '../actions/getKeywords'

import BackButton from '../components/BackButton'

import MessagePopUp from './MessagePopUp'

const SetKeywords = ({  team,
                        keyword,
                        keywords,
                        loading,
                        location,
                        metricValueNames,

                        setTeamProperty,
                        setTeamKeyword,
                        getKeywords,
                        setDataProperty,
                        setSavedMessage,
                      }) => {

  const creatingTeam = location.pathname === '/app/set_keywords' ? false : true

  const changesMade = keyword.length > 0 || !arrEqualsArr(metricValueNames, keywords)

  const onChange = {
    keyword(e) {
      e.preventDefault()
      setTeamProperty({keyword: e.target.value})
    },
  }

  const onClick = {
    save(e) {
      setDataProperty({loading: true})
      e.preventDefault()
      const updates = {}
      updates[`teams/${team}/keywords`] = keywords
      database.ref()
        .update(updates)
      getKeywords()
      setSavedMessage()
      setDataProperty({loading: false})
    },
    delete(e, w) {
      e.preventDefault()
      setTeamKeyword(w)
    },
    add(e, w) {
      e.preventDefault()
      setTeamKeyword(w)
      setTeamProperty({keyword: ''})
    }
  }

  const styles = {
    button: {
      height: 50,
      margin: 12,
    },
    deleteButton: {
      height: 25,
      width: 100,
      marginLeft: 10
    },
    addButton: {
      height: 25,
      width: 75,
      marginLeft: 10,
    },
  }

  return (
    <div className="color">
      <div className="editKeywords">
        {creatingTeam ?
          <h3>Please set your team's evaluation criteria keywords</h3> :
          <h3>Add or Remove Keywords</h3>
        }
        <input
          type="text"
          placeholder="New Keyword"
          value={keyword}
          onChange={onChange.keyword}
          />
        <RaisedButton
          onClick={(e, w = keyword) => onClick.add(e, w)}
          label="add"
          style={styles.addButton}
          className="reportButton"
          />
        { keywords ?
          <div>
            <h4>Keyword List</h4>
            {changesMade ? <p>(keyword changes will not appear in reports until they are saved)</p> : null}
            { keywords.map( (k, i) =>
              <div key={`kw-${i}`} className="keyword">
                {k}
                <RaisedButton
                  key={`db-${i}`}
                  onClick={(e, w = k) => onClick.delete(e, w)}
                  label="Delete"
                  style={styles.deleteButton}
                  className="reportButton"
                  />
              </div>
            )}
            <RaisedButton
              disabled={!changesMade}
              label="Save"
              style={styles.button}
              className="reportButton"
              onClick={onClick.save}
              />
            {creatingTeam ?
              <RaisedButton
                disabled={keywords.length === 0}
                label="Done"
                containerElement={<Link to="/app/" ></Link>}
                className="reportButton"
                style={styles.button}
                /> : ''}
          </div> : ''
        }
        </div>
      {creatingTeam ? <BackButton /> : ''}
      <MessagePopUp />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {

  const {
    keyword,
    keywords,
  } = state.teamConfig

  const { team } = state.user

  const { loading } = state.data

  const metricValueNames = Object.keys(state.metricValues)
                            .map( k => state.metricValues[k].name)

  return {
    team,
    keyword,
    keywords,
    loading,
    location: ownProps.location,
    metricValueNames,
  }
}

const mapDispatchToProps = dispatch => ({
  setTeamProperty: property => dispatch(setTeamProperty(property)),
  setTeamKeyword: keyword => dispatch(setTeamKeyword(keyword)),
  getKeywords: () => dispatch(getKeywords()),
  setDataProperty: property => dispatch(setDataProperty(property)),
  setSavedMessage: () => dispatch(setDataMessage('Your changes have been saved')),
})

SetKeywords.propTypes = {
  team: PropTypes.string,
  keyword: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  location: PropTypes.object,
  metricValueNames: PropTypes.arrayOf(PropTypes.string),
  setTeamProperty: PropTypes.func,
  setTeamKeyword: PropTypes.func,
  getKeywords: PropTypes.func,
  setDataProperty: PropTypes.func,
  setSavedMessage: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetKeywords)
