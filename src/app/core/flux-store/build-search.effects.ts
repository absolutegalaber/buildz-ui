import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {Buildz, IBuildSearchResult} from './model';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {buildSearchLoaded, doBuildSearch, searchBuildsOfProject, updateSearchParams} from './build-search.actions';
import {buildSearchParams} from './selectors';

@Injectable()
export class BuildSearchEffects {

  // noinspection JSUnusedLocalSymbols
  doBuildSearch$ = createEffect(() => this.actions$.pipe(
    ofType(doBuildSearch, searchBuildsOfProject, updateSearchParams),
    withLatestFrom(this.store.pipe(select(buildSearchParams))),
    switchMap(([action, backendSearchParams]) => this.http.post<IBuildSearchResult>(`/api/v1/builds/search`, backendSearchParams).pipe(
      map((result: IBuildSearchResult) => buildSearchLoaded({result: result}))
      )
    )
  ))


  constructor(private actions$: Actions, private http: HttpClient, private store: Store<Buildz>) {
  }
}

