import React, { Component } from 'react';
import Note from './note';

export default class NoteList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let html = this.props.notes.map((note) => {
      return <Note key={note.key} note={note} handleClick={e => {
        this.props.handleClick(note)
      }} handleRemoveNoteClick={e => {
        e.preventDefault();
        this.props.handleRemoveNoteClick(e, note);
      }} />;
    });
    return (
      <div className="note-list col-md-5">
        {html}
        <button className="add-note-btn btn btn-primary form-control" onClick={this.props.handleNewNoteClick}>+ New Note</button>
      </div>
    );
  }
}