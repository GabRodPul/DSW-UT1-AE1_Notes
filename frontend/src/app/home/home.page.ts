import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title:   string = "First note";
  content: string = "This is my first note";
  constructor(private router: Router) { }

  gotoUrl(url: string) {
    this.router.navigateByUrl(url, { state: { undefined } });
  }
}
