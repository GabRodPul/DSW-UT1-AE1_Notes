import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteFormPageRoutingModule } from './note-form-routing.module';

import { NoteFormPage } from './note-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NoteFormPage]
})
export class NoteFormPageModule {}
