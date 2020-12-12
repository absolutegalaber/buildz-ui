import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {Buildz, IBuildSearchResult} from './model';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {addSearchLabel, buildSearchLoaded, doBuildSearch, removeSearchLabel, searchBuildsOfProject, updateSearchParams} from './build-search.actions';
import {theBuildSearchParams} from './selectors';
import {of} from 'rxjs';
import {backendErrorOccurred} from './alert.actions';

@Injectable()
export class BuildSearchEffects {

  // noinspection JSUnusedLocalSymbols
  doBuildSearch$ = createEffect(() => this.actions$.pipe(
    ofType(doBuildSearch, searchBuildsOfProject, updateSearchParams, addSearchLabel, removeSearchLabel),
    withLatestFrom(this.store.pipe(select(theBuildSearchParams))),
    map(([action, backendSearchParams]) => backendSearchParams),
    exhaustMap((backendSearchParams) => this.http.post<IBuildSearchResult>(`/api/v1/builds/search`, backendSearchParams).pipe(
      map((result: IBuildSearchResult) => buildSearchLoaded({result: result})),
      catchError(errorResponse => of(backendErrorOccurred({errorResponse})))
      )
    )
  ))


  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}

