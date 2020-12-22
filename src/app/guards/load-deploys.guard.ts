import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Buildz} from '../core/flux-store/model';
import {Store} from '@ngrx/store';
import {LOAD_SERVER_DEPLOYS} from '../core/flux-store/server.actions';

@Injectable()
export class LoadDeploysGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const name = route.params.serverName;
    if (!!name) {
      this.store.dispatch(LOAD_SERVER_DEPLOYS({name}));

      return true;
    }

    return false;
  }

  constructor(private store: Store<Buildz>) {}
}
