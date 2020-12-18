import {Component} from '@angular/core';

@Component({
  selector: 'bz-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" [routerLink]="['/']">Build Buddy</a>
      <a class="nav-link ml-auto" [routerLink]="['/manage']">
        <fa-icon icon="cogs" size="2x"></fa-icon>
      </a>
    </nav>
  `
})
export class Navbar {

}
