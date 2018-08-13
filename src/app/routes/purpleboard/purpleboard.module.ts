import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PurpleBoardDetailComponent }    from './purpleboard-detail.component';
import { PurpleBoardComponent }  from './purpleboard.component';
 
import { PurpleboardService } from '../../_services/purpleboard.service';

import { PurpleboardRoutingModule } from './purpleboard-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DraggableModule } from '../../draggable/draggable.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    PurpleboardRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    DraggableModule
  ],
  declarations: [
    PurpleBoardDetailComponent,
    PurpleBoardComponent
  ],
  providers: [ PurpleboardService ]
})

export class PurpleboardModule {}