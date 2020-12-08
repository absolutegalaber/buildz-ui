import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BuildzAlert} from '../service/buildz-alert.state';
import {Store} from '@ngrx/store';
import {Buildz} from '../core/flux-store/model';
import {loadSingleEnvironment} from '../core/flux-store/environment.actions';

@Injectable()
export class LoadEnvironmentGuard implements CanActivate {

  constructor(private store: Store<Buildz>, private router: Router, private buildzAlert: BuildzAlert) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let environmentName = route.params['environmentName'];
    if (!!environmentName) {
      this.store.dispatch(loadSingleEnvironment({environmentName}))
      return true;
    }
    return false;
  }
}
