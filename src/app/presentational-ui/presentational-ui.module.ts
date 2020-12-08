import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from '../app-routing.module';
import {Navbar} from './components/navbar';
import {StatsPanel} from './components/stats.panel';
import {BuildSearchForm} from './components/build-search.form';
import {BuildList} from './components/build.list';
import {BuildLabelList} from './components/build-label.list';
import {EnvironmentBuildsPanel} from './components/environment-builds.panel';
import {EnvironmentForm} from './components/environment-form';
import {AlertPanel} from './components/alert.panel';
import {BuildsAccordion} from './components/builds.accordion';
import {ProjectList} from './components/project.list';
import {EnvironmentList} from './components/environment.list';
import {BuildsOfEnvironmentDialog} from './components/builds-of-environment.dialog';
import {AddLabelDialog} from './components/add-label.dialog';
import {BranchList} from './components/branch.list';
import {SetActivationForm} from './components/set-activation.form';
import {DeadCenterComponent} from './components/dead-center.component';

const reExports = [
  CoreModule,
  FormsModule,
  FontAwesomeModule,
  AppRoutingModule
]

const declarations = [
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
]

@NgModule({
  imports: [
    ...reExports
  ],
  exports: [
    ...reExports,
    ...declarations
  ],
  declarations: [
    ...declarations
  ]
})
export class PresentationalUiModule {

}
