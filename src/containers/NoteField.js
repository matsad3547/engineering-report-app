import React from 'react';
import { connect } from 'react-redux'

import { saveReportNotes } from '../actions'

const NoteField = ({ notes, dispatch }) => {
  return (
    <div>
      <textarea
        onChange={ (e, input) => {
            e.preventDefault()
            let output = e.target.value
            dispatch(saveReportNotes(output))
          }
        }
        name="textArea"
        rows={10}
        placeholder="Note Area"
        value={notes}
        >
      </textarea>
    </div>
  )
}

export default connect()(NoteField)
