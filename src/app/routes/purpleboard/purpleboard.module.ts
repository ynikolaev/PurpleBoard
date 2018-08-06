import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PurpleBoardDetailComponent }    from './purpleboard-detail.component';
import { PurpleBoardComponent }  from './purpleboard.component';
 
import { PurpleboardService } from '../../_services/purpleboard.service';

import { PurpleboardRoutingModule } from './purpleboard-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PurpleboardRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    PurpleBoardDetailComponent,
    PurpleBoardComponent
  ],
  providers: [ PurpleboardService ]
})

export class PurpleboardModule {}