import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CarouselComponent } from './routes/carousel/carousel.component';
import { ContactsComponent } from './routes/contacts/contacts.component';
import { PurpleBoardComponent } from './routes/purpleboard/purpleboard.component';
import { AdvancedComponent } from './routes/about/advanced.component';
import { AppComponent } from './app.component';

import { AnimboxComponent } from './_animations/animbox/animbox.component';

import { NotFoundPage } from './routes/404page/404page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { AdminComponent } from './admin/admin.component';


const ROUTES: Routes = [
  {
    path: 'home',
    component: CarouselComponent,
    data: {
      animation: {
        value: 'home',
      }
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      animation: {
        value: 'admin',
      }
    }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      animation: {
        value: 'contacts',
      }
    }
  },
  {
    path: 'purpleboard',
    component: PurpleBoardComponent,
    data: {
      animation: {
        value: 'purpleboard',
      }
    }
  },
  {
    path: 'about',
    component: AdvancedComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: {
      animation: {
        value: 'home',
      }
    }
  },
  {
    path: '**',
    component: NotFoundPage,
    data: {
      animation: {
        value: 'notfound',
      }
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    ContactsComponent,
    PurpleBoardComponent,
    AdvancedComponent,
    AnimboxComponent,
    FooterComponent,
    NotFoundPage,
    LoginDialogComponent,
    RegisterDialogComponent,
    AdminComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
