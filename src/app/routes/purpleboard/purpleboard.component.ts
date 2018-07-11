import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './purpleboard.component.html',
    styleUrls: [ './purpleboard.component.css'],
})

export class PurpleBoardComponent implements OnInit{ 
    image;
    constructor() {
        this.image="/assets/images/pb-icon.png";
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
}