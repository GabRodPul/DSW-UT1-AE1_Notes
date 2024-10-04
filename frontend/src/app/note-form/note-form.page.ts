import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Note, noteValidator } from '../types/note';
import { Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators'

const DEFAULT_NOTE = { id: -1, title: "", content: "" };

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage implements OnInit {

  update:   boolean;
  note:     Note;
  noteForm: FormGroup;

  constructor(
    public  formBuilder:  FormBuilder,
    private noteService:  NoteService,
    private router:       Router
  ) {
    this.update   = false;
    this.note     = DEFAULT_NOTE;
    this.noteForm = this.formBuilder.group( noteValidator );
  }

  ngOnInit() {   
    this.note     = this.router.getCurrentNavigation()?.extras.state?.["note"];
    
    // If there's no note cached, the form will create a new one
    if ( !(this.update = this.note !== undefined) ) {
      this.note = DEFAULT_NOTE, this.noteService.create;
      return;
    }

    this.noteForm = this.formBuilder.group({ 
      title:   [ this.note.title,   ...noteValidator.title.slice(1)   ],
      content: [ this.note.content, ...noteValidator.content.slice(1) ]
    })
   }

  uploadNote() {
    if (!this.noteForm.valid) return;

    const data = {
      title:   this.noteForm.controls[  "title"  ]!.value as string,
      content: this.noteForm.controls[ "content" ]!.value as string 
    };

    if (this.update)
      this.noteService.update({ id: this.note.id, ...data })
                      .subscribe( (res => this.router.navigateByUrl("/my-notes") ));
    else
      this.noteService.create(data)
                      .subscribe((res => this.router.navigateByUrl("/my-notes") ));
  }

  ionViewWillLeave() {
    this.note = DEFAULT_NOTE;
  }

  getFormControl(field: string) {
    return this.noteForm.get(field);
  }
}
