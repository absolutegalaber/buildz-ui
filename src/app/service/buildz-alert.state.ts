import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Alert} from './domain';
import {HttpErrorResponse} from '@angular/common/http';
import {toAlert} from './util-functions';

@Injectable()
export class BuildzAlert {
  private _theAlert: Subject<Alert> = new BehaviorSubject(null);


  get theAlert(): Subject<Alert> {
    return this._theAlert;
  }

  info(heading: string, message: string): void {
    this._theAlert.next({
      type: 'info',
      heading: heading,
      message: message
    });
  }

  error(heading: string, message: string): void {
    this._theAlert.next({
      type: 'danger',
      heading: heading,
      message: message
    });
  }

  errorOccurred(error: HttpErrorResponse) {
    this._theAlert.next(toAlert(error));
  }

  dismiss() {
    this._theAlert.next(null);
  }
}
