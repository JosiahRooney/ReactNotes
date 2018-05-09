import React, { Component } from 'react';
import NoteList from './note_list';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      selectedNote: null
    }
    this.keyCount = 0;
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleNewNoteClick = this.handleNewNoteClick.bind(this);
    this.handleRemoveNoteClick = this.handleRemoveNoteClick.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  getKey() {
    return this.keyCount++;
  }

  componentWillMount() {
    if (!this.state.selectedNote) {
      if (this.state.notes.length) {
        this.setState({ selectedNote: this.state.notes[0] });
      } else {
        let notes = [
          this.newNote()
        ];
        this.setState({ notes, selectedNote: notes[0] });
      }
    }
  }

  getTime() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let am_pm = hours > 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${am_pm}`;
  }

  newNote() {
    return {
      title: "New Note",
      text: "Enter text...",
      snippet: "No additional text",
      createdAt: this.getTime(),
      editedAt: this.getTime(),
      key: this.getKey()
    }
  }
  
  handleClick(selectedNote) {
    this.setState({ selectedNote });
  }

  handleTitleChange(event) {
    this.setState({
      notes: this.state.notes.map((note, index) => {
        if (note.key === this.state.selectedNote.key) {
          note.title = event.target.value;
          note.editedAt = this.getTime();
          return note;
        }
        return note;
      })
    })
  }

  handleBodyChange(event) {
    this.setState({
      notes: this.state.notes.map((note, index) => {
        if (note.key === this.state.selectedNote.key) {
          note.text = event.target.value;
          note.snippet = note.text.slice(0, 35);
          note.editedAt = this.getTime();
          return note;
        }
        return note;
      })
    })
  }

  handleRemoveNoteClick(event, delNote) {
    this.setState({
      notes: this.state.notes.filter((note) => {
        return note.key !== delNote.key;
      }),
      selectedNote: this.state.notes[0]
    })
  }

  handleNewNoteClick(event) {
    let notes = [...this.state.notes];
    notes.push(this.newNote());
    this.setState({ notes }, () => {
      this.setState({ selectedNote: this.state.notes[this.state.notes.length - 1] })
    });
  }

  render() {
    let title = this.state.selectedNote.title;
    if ( this.state.selectedNote.title === "New Note" ) {
      title = ""
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="app-title">Notes</h1>
          </div>
        </div>
        <div className="row">
          <NoteList notes={this.state.notes} handleClick={this.handleClick} handleNewNoteClick={this.handleNewNoteClick} getKey={this.getKey} handleRemoveNoteClick={this.handleRemoveNoteClick} />
          <div className="note-detail col-md-7">
            <h2>
              <input type="text" value={title} onChange={this.handleTitleChange} /> <small className="edited-at text-muted">{this.state.selectedNote.editedAt}</small>
            </h2>
            <p>
              <textarea cols="77" rows="30" value={this.state.selectedNote.text} onChange={this.handleBodyChange}></textarea>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
