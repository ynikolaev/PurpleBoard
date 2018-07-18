import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MomentModule } from 'ngx-moment';

import { Board, PurpleboardService } from './purpleboard.service';

@Component({
    templateUrl: './purpleboard.component.html',
    styleUrls: ['./purpleboard.component.css'],
})

export class PurpleBoardComponent implements OnInit {
    image: String;
    boards$: Observable<Board[]>;
    today;
    dd;
    mm;
    yyyy;
    private selectedId: number;
    constructor(private service: PurpleboardService, private route: ActivatedRoute) {
        this.image = "/assets/images/pb-icon.png";
    }
    ngOnInit(): void {
        this.boards$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                // (+) before `params.get()` turns the string into a number
                this.selectedId = +params.get('id');
                console.log("Selected id: " + this.selectedId);
                return this.service.getBoards();
            })
        );
    }
}