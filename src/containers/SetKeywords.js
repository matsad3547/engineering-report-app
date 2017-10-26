import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

import database from '../utils/firebase'

import {
  setTeamProperty,
  setTeamKeyword,
} from '../actions/'

import { getKeywords } from '../actions/getKeywords'
import BackButton from '../components/BackButton'

const SetKeywords = ({  team,
                        keyword,
                        keywords,
                        loading,
                        location,
                        setTeamProperty,
                        setTeamKeyword,
                        getKeywords,
                      }) => {
                        
  const creatingTeam = location.pathname === '/app/set_keywords' ? false : true

  const onChange = {
    keyword(e) {
      e.preventDefault()
      setTeamProperty({keyword: e.target.value})
    },
  }

  const onClick = {
    save(e) {
      e.preventDefault()
      const updates = {}
      updates[`teams/${team}/keywords`] = keywords
      database.ref()
        .update(updates)
      getKeywords()
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
            <p>(keyword changes will not appear in reports until they are saved)</p>
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
              disabled={keywords.length === 0}
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

  return {
    team,
    keyword,
    keywords,
    loading,
    location: ownProps.location,
  }
}

const mapDispatchToProps = dispatch => ({
  setTeamProperty: property => dispatch(setTeamProperty(property)),
  setTeamKeyword: keyword => dispatch(setTeamKeyword(keyword)),
  getKeywords: () => dispatch(getKeywords())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetKeywords)
