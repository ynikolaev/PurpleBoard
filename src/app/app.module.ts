import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/home.component';
import { BasicComponent } from './routes/basic.component';
import { ContainedComponent } from './routes/contained.component';
import { AdvancedComponent } from './routes/advanced.component';
import { AppComponent } from './app.component';
import { NotFoundPage } from './routes/404page/404page.component';

const websiteRoutes: Routes = [
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'animation-home',
    component: HomeComponent
  },
  {
    path: 'animation-basics',
    component: BasicComponent
  },
  {
    path: 'animation-contained',
    component: ContainedComponent
  },
  {
    path: 'animation-advanced',
    component: AdvancedComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasicComponent,
    ContainedComponent,
    AdvancedComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
