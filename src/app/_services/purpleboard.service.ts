import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BoardDetails, UpdateTime, CardDetails, ItemDetails } from './_intefaces/interfaces'

export class Board {
    constructor(public _id: String, public title: String, public description: String, public lastUploaded: Number, public owner_id: String) { }
}

export class Card {
    constructor(public _id: String, public name: String, public description: String, public label: String, public board_id: String, public items: any) { }
}

export class Item {
    constructor(public _id: String, public text: String, public label: String, public assigned_user: String, public card_id: String) { }
}

const apiUrl = "http://localhost:3000/api"; //backend server

const BOARDS = [
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
    new Board("11", 'Mr. Nice', 'Desc 1 qwerty', 1522207208920, 'qwqe'),
];

@Injectable()
export class PurpleboardService {

    constructor(private httpClient: HttpClient, private http: Http, private router: Router) { }

    public addBoard(board: BoardDetails): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/addBoard`;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, board, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getAllBoards(user_id: String): Observable<BoardDetails[]> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/getBoards/${user_id}`;
        return this.http.get(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getBoard(board_id: string): Observable<BoardDetails[]> {
        //console.log("Rcieved string: " + board_id);
        let myHeaders = new Headers();
        //append() method inserts specified content at the end of the selected elements
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/getBoard/${board_id}`;
        return this.http.get(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getCards(board_id: string): Observable<CardDetails[]> {
        //console.log("Rcieved string: " + board_id);
        let myHeaders = new Headers();
        //append() method inserts specified content at the end of the selected elements
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/getCards/${board_id}`;
        return this.http.get(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public removeBoard(board_id): Observable<any[]> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/removeBoard/${board_id}`;
        return this.http.delete(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addCard(card: CardDetails): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/addCard`;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, card, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public removeCard(card_id): Observable<any[]> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/removeCard/${card_id}`;
        return this.http.delete(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addItem(item: ItemDetails): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/addItem`;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, item, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public removeItem(card_id, item_id): Observable<any[]> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/removeItem/${card_id}/${item_id}`;
        return this.http.delete(URI, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateTime(updateTime: UpdateTime): Observable<any> {
        let headers = new Headers;
        let URI = `${apiUrl}/updateTime`;
        headers.append('Content-Type', 'application/json');
        return this.http.put(URI, updateTime, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        //console.log("Rcieved body: " + JSON.stringify(body));
        return body;
    }

    private handleError(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}