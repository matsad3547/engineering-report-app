import React from 'react'
import PropTypes from 'prop-types'

const NoteField = ({  notes,
                      saveReportNotes,
                    }) => (

  <div>
    <textarea
      onChange={ e => saveReportNotes(e.target.value)
      }
      name="textArea"
      rows={10}
      placeholder="Note Area"
      value={notes}
      >
    </textarea>
  </div>
)

NoteField.propTypes = {
  notes: PropTypes.string,
  saveReportNotes: PropTypes.func,
}

export default NoteField
