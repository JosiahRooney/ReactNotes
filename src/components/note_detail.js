import React, { Component } from 'react';

export default class NoteDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="note-detail col-md-7">
        <h2>
          <input type="text" value={this.props.selectedNote.title} onChange={this.props.handleTitleChange} /> 1{this.props.selectedNote.editedAt}1
        </h2>
        <p>
          <textarea cols="77" rows="30" value={this.props.selectedNote.text} onChange={this.props.handleBodyChange}></textarea>
        </p>
      </div>
    );
  }
}