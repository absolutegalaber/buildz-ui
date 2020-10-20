import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Navbar} from './components/navbar';
import {HomePage} from './pages/home.page';
import {HttpClientModule} from '@angular/common/http';
import {StatsPanel} from './components/stats.panel';
import {BuildsClientService} from './service/builds-client.service';
import {BuildsPage} from './pages/builds.page';
import {BuildSearchFrom} from './components/build-search.from';
import {FormsModule} from '@angular/forms';
import {BuildList} from './components/build.list';
import {BuildLabelList} from './components/build-label.list';

let components = [
  Navbar,
  StatsPanel,
  BuildSearchFrom,
  BuildList,
  BuildLabelList,
];

let pages = [
  HomePage,
  BuildsPage
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
    BuildsClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
