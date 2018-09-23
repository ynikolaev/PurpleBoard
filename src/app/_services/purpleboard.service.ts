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
    _id: String;
    title: String;
    description: String;
    lastUploaded: Number;
    owner_id: String;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Card {
    constructor(public _id: String, public name: String, public description: String, public label: String, public board_id: String, public items: any) { }
}

export class Item {
    constructor(public _id: String, public text: String, public label: String, public assigned_user: String, public card_id: String, public editable: Boolean) { }
}

const apiUrl = "http://localhost:3000/api"; //backend server

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

    public updateBoard(board: BoardDetails, boardId): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/updateBoard`;
        let params = {
            boardInfo: board,
            board_id: boardId
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(URI, params, { headers: headers })
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

    public getAllBoards(user_id: String) {
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

    public addCard(card: CardDetails): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/addCard`;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, card, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateCard(card: CardDetails, cardId): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/updateCard`;
        let params = {
            cardInfo: card,
            card_id: cardId
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(URI, params, { headers: headers })
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

    public updateItem(item: ItemDetails, itemId): Observable<any> {
        //return this.request('post', 'addBoard', board);
        let headers = new Headers;
        let URI = `${apiUrl}/updateItem`;
        let params = {
            itemInfo: item,
            item_id: itemId
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(URI, params, { headers: headers })
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

    public updateWizardStart(user_id): Observable<any> {
        let headers = new Headers;
        let URI = `${apiUrl}/wizardUserUpdate`;
        let params = {
            user_id: user_id
        }
        headers.append('Content-Type', 'application/json');
        return this.http.put(URI, params, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    public checkWizardStart(user_id): Observable<any> {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: myHeaders });
        let URI = `${apiUrl}/wizardUserCheck/${user_id}`;
        return this.http.get(URI, options)
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