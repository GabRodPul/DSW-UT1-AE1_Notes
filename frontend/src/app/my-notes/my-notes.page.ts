import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/types/note';
import { NoteService } from '../services/note.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.page.html',
  styleUrls: ['./my-notes.page.scss'],
})
export class MyNotesPage implements OnInit {

  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes().subscribe(res => { this.notes = res as Note[]; });
  }
}
