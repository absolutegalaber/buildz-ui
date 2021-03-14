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
import {BranchList} from './components/branch.list';
import {SetActivationPanel} from './components/set-activation.panel';
import {DeadCenterComponent} from './components/dead-center.component';
import {ProjectAccordion} from './components/project.accordion';
import {IsVisibleIcon} from './components/is-visible.icon';
// Server related components
import {ServersListComponent} from './components/servers-list.component';
import {DeploysAccordionComponent} from './components/deploys-accordion.component';
import {MomentModule} from 'ngx-moment';
import {BuildIdentifierPanel} from './components/build-identifier.panel';

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
  BranchList,
  SetActivationPanel,
  ProjectAccordion,
  IsVisibleIcon,
  ServersListComponent,
  DeploysAccordionComponent,
  BuildIdentifierPanel
];

@NgModule({
  imports: [
    ...reExports,
    MomentModule
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
