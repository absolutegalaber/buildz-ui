import {Component} from '@angular/core';
import {Buildz, IServer} from '../core/flux-store/model';
import {select, Store} from '@ngrx/store';
import {theCurrentServer} from '../core/flux-store/selectors';

@Component({
  templateUrl: './deploys.page.html'
})
// tslint:disable-next-line:component-class-suffix
export class DeploysPage {
  server = this.store.pipe(select(theCurrentServer));

  constructor(private store: Store<Buildz>) {}
}
