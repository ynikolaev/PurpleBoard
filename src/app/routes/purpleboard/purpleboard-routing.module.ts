import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurpleBoardComponent } from './purpleboard.component';
import { PurpleBoardDetailComponent } from './purpleboard-detail.component';

const boardsRoutes: Routes = [
    {
        path: 'boards',
        component: PurpleBoardComponent,
        data: {
            animation: {
                value: 'purpleboard',
            }
        }
    },
    {
        path: 'board/:id',
        component: PurpleBoardDetailComponent,
        data: {
            animation: {
                value: 'purpleboard',
            }
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(boardsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PurpleboardRoutingModule { }