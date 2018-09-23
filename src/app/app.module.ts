import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule, ClrModal, ClrWizard } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from "@angular/material";
import { PurpleboardModule } from './routes/purpleboard/purpleboard.module';
import { MomentModule } from 'ngx-moment';

import { CarouselComponent } from './routes/carousel/carousel.component';
import { ContactsComponent } from './routes/contacts/contacts.component';
//import { PurpleBoardComponent } from './routes/purpleboard/purpleboard.component';
import { AdvancedComponent } from './routes/about/advanced.component';
import { AppComponent } from './app.component';

import { AnimboxComponent } from './_animations/animbox/animbox.component';

import { NotFoundPage } from './routes/404page/404page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from './_services/users.service';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuardService } from './_services/auth-guard.service';

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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: {
      animation: {
        value: 'profile',
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
    AdvancedComponent,
    AnimboxComponent,
    FooterComponent,
    NotFoundPage,
    LoginDialogComponent,
    ProfileComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ClarityModule,
    SlimLoadingBarModule,
    PurpleboardModule,
    MomentModule,
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    UserService,
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
