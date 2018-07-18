import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contacts.component.html',
    styleUrls: [ './contacts.component.css'],
})

export class ContactsComponent implements OnInit {
    switchstate;
    currentState;
    ngOnInit() {
        this.currentState = "rest";
        this.switchstate = 'original';
        console.log("OnInit Contacts");
    }
    setState(state) {
        this.switchstate = state;
        console.log(state);
    }
    setMouse(state) {
        this.currentState = state;
        console.log(state);    
    }
}