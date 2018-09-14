import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface UserDetails {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    exp: number;
    iat: number;
}

export interface TokenPayload {
    email?: string;
    password?: string;
}

interface TokenResponse {
    token: string;
}

const apiUrl = "http://localhost:3000/api"; //backend server

@Injectable()
export class AuthenticationService {
    private token: string;

    constructor(private httpClient: HttpClient, private http: Http, private router: Router) { }

    private handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json());
        ;
    }

    private saveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            //console.log("Logged in");
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public isAdmin(): boolean {
        const user = this.getUserDetails();
        if (user) {
            if (user.email == "ynbusinessinq1@gmail.com") {
                //console.log("Logged in");
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public getId(): String {
        const user = this.getUserDetails();
        if (user) {
            return user._id;
        } else {
            return null;
        }
    }

    private request(method: 'post' | 'get', type: 'isEmailRegisterd' | 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
        let base;

        if (method === 'post') {
            base = this.httpClient.post(`${apiUrl}/${type}`, user);
        } else {
            base = this.httpClient.get(`${apiUrl}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }

        const request = base.pipe(
            map((data: TokenResponse) => {
                //recieves token
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );

        return request;
    }

    public profile(): Observable<any> {
        return this.request('get', 'profile');
    }

    public isEmailRegisterd(user: TokenPayload): Observable<any> {
        return this.request('post', 'isEmailRegisterd', user);
    }

    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user);
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        this.router.navigateByUrl('/home');
    }
}