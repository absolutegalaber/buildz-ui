import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomePage} from './pages/home.page';
import {BuildsPage} from './pages/builds.page';
import {EnvironmentPage} from './pages/environment.page';
import {LoadEnvironmentGuard} from './guards/load-environment-guard';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';
import {NewEnvironmentGuard} from './guards/new-environment-guard';
import {NotFoundGuard} from './guards/not-found.guard';
import {ManagementPage} from './pages/management.page';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faBackspace, faCheck, faCogs, faEye, faEyeSlash, faPlus, faSave, faSync, faToggleOff, faToggleOn, faUndo} from '@fortawesome/free-solid-svg-icons';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProjectsEffects} from './core/flux-store/projects.effects';
import {BuildSearchEffects} from './core/flux-store/build-search.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {Buildz, buildzReducers} from './core/flux-store/model';
import {loadProjects} from './core/flux-store/projects.actions';
import {loadBuildStats} from './core/flux-store/build-stats.actions';
import {BuildStatsEffects} from './core/flux-store/build-stats.effects';
import {EnvironmentEffects} from './core/flux-store/environment.effects';
import {PresentationalUiModule} from './presentational-ui/presentational-ui.module';
import {loadKnownEnvironments} from './core/flux-store/environment.actions';
import {AddLabelDialog} from './dialogs/add-label.dialog';
import {BuildsOfEnvironmentDialog} from './dialogs/builds-of-environment.dialog';
import {ConfirmDialog} from './dialogs/confirm.dialog';

let pages = [
  HomePage,
  BuildsPage,
  EnvironmentPage,
  ManagementPage
]
let dialogs = [
  AddLabelDialog,
  BuildsOfEnvironmentDialog,
  ConfirmDialog
]

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...dialogs
  ],
  imports: [
    BrowserModule,
    PresentationalUiModule,
    StoreModule.forRoot(buildzReducers, {}),
    EffectsModule.forRoot([
      BuildSearchEffects,
      ProjectsEffects,
      BuildStatsEffects,
      EnvironmentEffects
    ]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
  ],
  providers: [
    LoadEnvironmentGuard,
    LoadBuildsSearchGuard,
    NewEnvironmentGuard,
    NotFoundGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary, store: Store<Buildz>) {
    store.dispatch(loadProjects())
    store.dispatch(loadBuildStats())
    store.dispatch(loadKnownEnvironments())
    library.addIcons(
      faCogs, faSave, faToggleOn, faToggleOff, faPlus, faBackspace, faCheck, faUndo, faSync, faEye, faEyeSlash
    )
  }
}
