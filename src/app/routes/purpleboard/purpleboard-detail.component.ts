import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'; //Observable route parameters
import { Observable } from 'rxjs';

import { Board, PurpleboardService } from './purpleboard.service';

@Component({
    template: `
  <h2>HEROES</h2>
  <div *ngIf="board$ | async as board">
    <h3>"{{ board.name }}"</h3>
    <div>
      <label>Id: </label>{{ board.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="board.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoBoards(board)">Back</button>
    </p>
  </div>
  `,
})

export class PurpleBoardDetailComponent implements OnInit {
    board$: Observable<Board>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: PurpleboardService
    ) { }


    ngOnInit(): void {
        //take the parameter from URL
        this.board$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.service.getBoard(params.get('id')))
        );
        //alternatively can use:
        //let id = this.route.snapshot.paramMap.get('id');
        //this.board$ = this.service.getBoard(id);
    }

    gotoBoards(board: Board) {
        let boardId = board ? board.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        // Include a junk 'foo' property for fun.
        this.router.navigate(['/boards', { id: boardId, foo: 'foo' }]);
    }
}