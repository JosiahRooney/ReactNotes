import React, { Component } from 'react';

export default class Note extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let title = "New Note";
    if (this.props.note.title.length) {
      title = this.props.note.title;
    }
    return (
      <div className="note" onClick={this.props.handleClick}>
        <div className="deleter" onClick={this.props.handleRemoveNoteClick}>X</div>
        <div className="note__body">
          <h2>{title}</h2>
          <p>
            {this.props.note.createdAt} {this.props.note.snippet}
          </p>
        </div>
      </div>
    );
  }
}