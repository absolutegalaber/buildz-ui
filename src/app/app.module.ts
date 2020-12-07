import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Navbar} from './components/navbar';
import {HomePage} from './pages/home.page';
import {HttpClientModule} from '@angular/common/http';
import {StatsPanel} from './components/stats.panel';
import {BuildzApi} from './service/builds-api.service';
import {BuildsPage} from './pages/builds.page';
import {BuildSearchForm} from './components/build-search.form';
import {FormsModule} from '@angular/forms';
import {BuildLabelList} from './components/build-label.list';
import {EnvironmentPage} from './pages/environment.page';
import {LoadEnvironmentGuard} from './guards/load-environment-guard';
import {EnvironmentBuildsPanel} from './components/environment-builds.panel';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';
import {BuildzData} from './service/buildz-data.state';
import {EnvironmentsApi} from './service/environments-api.service';
import {EnvironmentForm} from './components/environment-form';
import {AlertPanel} from './components/alert.panel';
import {DeadCenterComponent} from './layout/dead-center.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BuildzAlert} from './service/buildz-alert.state';
import {BuildsAccordion} from './components/builds.accordion';
import {ProjectList} from './components/project.list';
import {BuildList} from './components/build.list';
import {EnvironmentList} from './components/environment.list';
import {BuildsOfEnvironmentDialog} from './components/builds-of-environment.dialog';
import {NewEnvironmentGuard} from './guards/new-environment-guard';
import {NotFoundGuard} from './guards/not-found.guard';
import {AddLabelDialog} from './components/add-label.dialog';
import {ProjectsApi} from './service/projects-api.service';
import {ManagementPage} from './pages/management.page';
import {BranchList} from './components/branch.list';
import {SetActivationForm} from './components/set-activation.form';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBackspace, faCheck, faCogs, faPlus, faSave, faSync, faToggleOff, faToggleOn, faUndo} from '@fortawesome/free-solid-svg-icons';

let components = [
  Navbar,
  StatsPanel,
  BuildSearchForm,
  BuildList,
  BuildLabelList,
  EnvironmentBuildsPanel,
  EnvironmentForm,
  AlertPanel,
  DeadCenterComponent,
  BuildsAccordion,
  ProjectList,
  EnvironmentList,
  BuildsOfEnvironmentDialog,
  AddLabelDialog,
  BranchList,
  SetActivationForm
];

let pages = [
  HomePage,
  BuildsPage,
  EnvironmentPage,
  ManagementPage
]

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...pages
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    BuildzApi,
    EnvironmentsApi,
    ProjectsApi,
    BuildzData,
    BuildzAlert,
    LoadEnvironmentGuard,
    LoadBuildsSearchGuard,
    NewEnvironmentGuard,
    NotFoundGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCogs, faSave, faToggleOn, faToggleOff, faPlus, faBackspace, faCheck, faUndo, faSync
    )
  }
}
