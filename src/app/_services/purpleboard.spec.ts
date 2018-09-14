import { Board, PurpleboardService } from './purpleboard.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('Board', () => {
    beforeEach(() => {
        //TestBed is a utility provided by @angular/core/testing to
        //configure and create an Angular testing module in which we want to
        //run our unit tests.
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule,
                RouterModule.forRoot([])
            ],
            providers: [
                PurpleboardService,
                HttpClient,
                { provide: APP_BASE_HREF, useValue: '/' },
            ]
        });
    });

    it('should create an instance', () => {
        expect(new Board()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        let board = new Board({
            _id: '01',
            title: 'Test',
            description: 'Test',
            lastUploaded: 12345,
            owner_id: '01'
        });
        expect(board._id).toEqual('01');
        expect(board.title).toEqual('Test');
        expect(board.description).toEqual('Test');
        expect(board.lastUploaded).toEqual(12345);
        expect(board.owner_id).toEqual('01');
    });

    it('should addd the service', inject([PurpleboardService], (service: PurpleboardService) => {
        expect(service).toBeTruthy();
    }));
});