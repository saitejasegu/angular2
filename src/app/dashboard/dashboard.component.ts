import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMessage: string;
  note: Note;
  notes: Array<Note>;

  constructor(private noteService: NotesService) {
    this.notes = [];
    this.note = new Note();
  }
  ngOnInit() {
    this.noteService.getNotes().subscribe(response => {
      this.notes = response;
      this.note = new Note();
    }, error => {
      this.errMessage = error.message;
    });
  }
  addNote() {
    if (this.note.title !== ('' || undefined) && this.note.text !== ('' || undefined)) {
    this.noteService.addNote(this.note).subscribe(addednote => {
    this.notes.push(addednote);
    this.note = new Note();
    this.errMessage = '';
    }, error => {
      this.errMessage = error.message;
    });
    }else {
    this.errMessage = 'Title and Text both are required fields';
    }
  }
}