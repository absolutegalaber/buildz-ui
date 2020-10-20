import {Component} from '@angular/core';

@Component({
  selector: 'bz-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" [routerLink]="['/']">Buildz</a>
    </nav>
  `
})
export class Navbar {

}
