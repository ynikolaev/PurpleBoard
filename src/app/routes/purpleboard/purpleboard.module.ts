import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
 
import { PurpleBoardDetailComponent }    from './purpleboard-detail.component';
import { PurpleBoardComponent }  from './purpleboard.component';
 
import { PurpleboardService } from './purpleboard.service';

import { PurpleboardRoutingModule } from './purpleboard-routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PurpleboardRoutingModule
  ],
  declarations: [
    PurpleBoardDetailComponent,
    PurpleBoardComponent
  ],
  providers: [ PurpleboardService ]
})

export class PurpleboardModule {}