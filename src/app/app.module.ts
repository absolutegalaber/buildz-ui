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
import {faBackspace, faCheck, faCogs, faEye, faEyeSlash, faLock, faPlus, faSave, faSync, faToggleOff, faToggleOn, faUndo} from '@fortawesome/free-solid-svg-icons';
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
// Server related actions and effects
import {LOAD_KNOWN_SERVERS} from './core/flux-store/server.actions';
import {ServersEffects} from './core/flux-store/servers.effects';
// Deploy related components
import {DeploysPage} from './pages/deploys.page';
import {LoadDeploysGuard} from './guards/load-deploys.guard';
import {MomentModule} from 'ngx-moment';
// Release related components
import {CreateReservationDialog} from './dialogs/create-reservation.dialog';
import {ReleaseReservationDialog} from './dialogs/release-reservation.dialog';
import {LoadServerGuard} from './guards/load-server.guard';

const pages = [
  HomePage,
  BuildsPage,
  EnvironmentPage,
  ManagementPage,
  DeploysPage
];
const dialogs = [
  AddLabelDialog,
  BuildsOfEnvironmentDialog,
  ConfirmDialog,
  CreateReservationDialog,
  ReleaseReservationDialog
];

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
      EnvironmentEffects,
      ServersEffects
    ]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MomentModule
  ],
  providers: [
    LoadEnvironmentGuard,
    LoadBuildsSearchGuard,
    NewEnvironmentGuard,
    LoadDeploysGuard,
    LoadServerGuard,
    NotFoundGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary, store: Store<Buildz>) {
    store.dispatch(loadProjects())
    store.dispatch(loadBuildStats())
    store.dispatch(loadKnownEnvironments())
    store.dispatch(LOAD_KNOWN_SERVERS());
    library.addIcons(
      faCogs,
      faSave,
      faToggleOn,
      faToggleOff,
      faPlus,
      faBackspace,
      faCheck,
      faUndo,
      faSync,
      faEye,
      faEyeSlash,
      faLock
    );
  }
}
