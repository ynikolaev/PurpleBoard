import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export class Board {
    nextDay: Date;
    constructor(public id: number, public name: string, public date: String) {
     }
}

const BOARDS = [
    new Board(11, 'Mr. Nice', '05/07/2018'),
    new Board(12, 'Narco', '03/07/2018'),
    new Board(13, 'Bombasto', '02/07/2018'),
    new Board(14, 'Celeritas', '01/07/2018'),
    new Board(15, 'Magneta', '10/07/2018'),
    new Board(16, 'RubberMan', '10/07/2018')
];

@Injectable()
export class PurpleboardService {
    getBoards() { return of(BOARDS); }

    getBoard(id: number | string) {
        return this.getBoards().pipe(
            // (+) before `id` turns the string into a number
            map(boards => boards.find(board => board.id === +id))
        );
    }
}