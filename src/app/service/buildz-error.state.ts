import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class BuildzError {
  private _error: Subject<any> = new BehaviorSubject(null);


  get error(): Observable<any> {
    return this._error;
  }

  errorOccurred(error: any) {
    this._error.next(error);
  }
}
