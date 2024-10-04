import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Router } from '@angular/router';
import { noteValidator } from '../types/note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage implements OnInit {

  noteForm: FormGroup;

  constructor(
    public  formBuilder:  FormBuilder,
    private noteService:  NoteService,
    private router:       Router
  ) {
    this.noteForm = this.formBuilder.group( noteValidator );
  }

  ngOnInit() { }

  createNote() {
    if (!this.noteForm.valid) {
      console.log("Invalid form");
      return;
    }

    console.log(" Valid form:", this.noteForm.value );
    this.noteService
      .create({ 
        title:   this.noteForm.get( "title" )  !.value as string,
        content: this.noteForm.get( "content" )!.value as string 
      })
      .subscribe(res => this.router.navigateByUrl("/home"));
  }

  getFormControl(field: string) {
    return this.noteForm.get(field);
  }
}
