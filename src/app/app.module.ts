import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselComponent } from './routes/carousel/carousel.component';
import { ContactsComponent } from './routes/contacts/contacts.component';
import { ContainedComponent } from './routes/purpleboard/contained.component';
import { AdvancedComponent } from './routes/about/advanced.component';
import { AppComponent } from './app.component';

import { AnimboxComponent } from './_animations/animbox/animbox.component';

import { NotFoundPage } from './routes/404page/404page.component';
import { FooterComponent } from './footer/footer.component';


const websiteRoutes: Routes = [
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
    path: 'contacts',
    component: ContactsComponent,
    data: {
      animation: {
        value: 'contacts',
      }
    }
  },
  {
    path: 'animation-contained',
    component: ContainedComponent
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
    ContainedComponent,
    AdvancedComponent,
    AnimboxComponent,
    FooterComponent,
    NotFoundPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(websiteRoutes),
    ClarityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
