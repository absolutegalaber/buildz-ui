import {Component} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Buildz} from './core/flux-store/model'
import {theCurrentAlert} from './core/flux-store/selectors'
import {clearAlert} from './core/flux-store/alert.actions'

@Component({
  selector: 'bz-root',
  template: `
    <bz-navbar></bz-navbar>
    <bz-alert-panel [alert]="alert|async" (clearAlert)="clearAlert()"></bz-alert-panel>
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  alert = this.store.pipe(select(theCurrentAlert))

  clearAlert(): void {
    this.store.dispatch(clearAlert())
  }

  constructor(private store: Store<Buildz>) {
  }
}
