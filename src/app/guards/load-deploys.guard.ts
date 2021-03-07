import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Buildz} from '../core/flux-store/model';
import {Store} from '@ngrx/store';
import {DEPLOY_SEARCH} from '../core/flux-store/server.actions';

@Injectable()
export class LoadDeploysGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const serverName = route.params.serverName;
    if (!!serverName) {
      this.store.dispatch(DEPLOY_SEARCH({serverName }));

      return true;
    }

    return false;
  }

  constructor(private store: Store<Buildz>) {}
}
