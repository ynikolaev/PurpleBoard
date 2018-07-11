import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {
    images: any[] = [];
    background1;
    background2;
    @ViewChild('carousel') carousel: any;
    constructor(config: NgbCarouselConfig) {
        this.background1 = this.images.push("./assets/images/background1.gif");
        this.background2 = this.images.push("./assets/images/background1.png");
        // customize default values of carousels used by this component tree
        config.interval = 0;
        config.wrap = false;
        config.keyboard = false;
        config.showNavigationArrows = false;
    }
    ngOnInit() {
        console.log("OnInit Carousel loaded");
    }
}