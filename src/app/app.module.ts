import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Navbar} from './components/navbar';
import {HomePage} from './pages/home.page';
import {HttpClientModule} from '@angular/common/http';
import {StatsPanel} from './components/stats.panel';
import {BuildsApi} from './service/builds-api.service';
import {BuildsPage} from './pages/builds.page';
import {BuildSearchFrom} from './components/build-search.from';
import {FormsModule} from '@angular/forms';
import {BuildList} from './components/build.list';
import {BuildLabelList} from './components/build-label.list';
import {EnvironmentBuildsPage} from './pages/environment-builds.page';
import {LoadEnvironmentsBuildsGuard} from './guards/load-environmentsBuilds.guard';
import {EnvironmentBuildsPanel} from './components/environment-builds.panel';

let components = [
  Navbar,
  StatsPanel,
  BuildSearchFrom,
  BuildList,
  BuildLabelList,
  EnvironmentBuildsPanel
];

let pages = [
  HomePage,
  BuildsPage,
  EnvironmentBuildsPage
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
    BuildsApi,
    LoadEnvironmentsBuildsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
