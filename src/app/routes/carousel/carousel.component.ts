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
        this.background1 = this.images.push("./assets/images/carousel.png");
        this.background2 = this.images.push("./assets/images/carousel.png");
        // customize default values of carousels used by this component tree
        config.interval = 0;
        config.wrap = true;
        config.keyboard = true;
        config.showNavigationArrows = false;
        config.showNavigationIndicators = false;
    }
    ngOnInit() {
        console.log("OnInit Carousel loaded");
    }
}