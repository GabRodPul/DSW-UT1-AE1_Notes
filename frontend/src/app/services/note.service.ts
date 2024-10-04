import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Note } from '../types/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  endpoint = "http://localhost:8080/api/notes"

  constructor(private http: HttpClient) { }

  getAllNotes() {
    return this.http.get( this.endpoint );
  }

  create(note: Omit<Note, "id">) {
    const headers = new HttpHeaders({ 'Content-Type' : "application/x-www-form-urlencoded" });

    const body = new HttpParams()
               .append( "title",   note.title   )
               .append( "content", note.content );

    return this.http.post( this.endpoint, body.toString(), { headers } );
  }

  delete(id: number) {
    return this.http.delete( `${this.endpoint}/${id}` );
  }  
}
