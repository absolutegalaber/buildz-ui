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
import {BuildSearchFrom} from './components/build-search.from';
import {FormsModule} from '@angular/forms';
import {BuildList} from './components/build.list';
import {BuildLabelList} from './components/build-label.list';
import {EnvironmentPage} from './pages/environment.page';
import {LoadEnvironmentGuard} from './guards/load-environment-guard';
import {EnvironmentBuildsPanel} from './components/environment-builds.panel';
import {LoadBuildsSearchGuard} from './guards/load-builds-search-guard.service';
import {BuildzData} from './service/buildz-data.state';
import {EnvironmentsApi} from './service/environments-api.service';
import {EnvironmentForm} from './components/environment-form';
import {ErrorPage} from './pages/error.page';
import {BuildzError} from './service/buildz-error.state';
import {ErrorAlertPanel} from './components/error-alert.panel';

let components = [
  Navbar,
  StatsPanel,
  BuildSearchFrom,
  BuildList,
  BuildLabelList,
  EnvironmentBuildsPanel,
  EnvironmentForm,
  ErrorAlertPanel
];

let pages = [
  HomePage,
  BuildsPage,
  EnvironmentPage,
  ErrorPage
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
    FormsModule
  ],
  providers: [
    BuildzApi,
    EnvironmentsApi,
    BuildzData,
    BuildzError,
    LoadEnvironmentGuard,
    LoadBuildsSearchGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
