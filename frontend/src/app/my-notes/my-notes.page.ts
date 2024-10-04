import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/types/note';
import { NoteService } from '../services/note.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.page.html',
  styleUrls: ['./my-notes.page.scss'],
})
export class MyNotesPage implements OnInit {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private router:      Router,
  ) { }

  ngOnInit() {
    // this.getAllNotes();
  }

  ionViewWillEnter() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes().subscribe(res => { this.notes = (res as Note[]).sort( n => n.id ); });
  }

  gotoNoteForm(note: Note | undefined) {
    this.router.navigateByUrl("note-form", { state: { note } });
  }

  deleteNote(id: number) {
    this.noteService.delete(id).subscribe(res => {
      this.getAllNotes();
    });
  }
}
