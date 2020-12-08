import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Buildz, IAlertMessage} from '../core/flux-store/model';
import {frontendError} from '../core/flux-store/alert.actions';

@Injectable()
export class NotFoundGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let alertMessage: IAlertMessage = {
      heading: 'Where are you going?',
      message: 'You seem to have called an url that does not exist.'
    }
    this.store.dispatch(frontendError({alertMessage}))
    return true;
  }


  constructor(private store: Store<Buildz>) {
  }
}
