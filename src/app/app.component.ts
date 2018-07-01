import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';
import { pageAnimation } from './_animations/slideanimation/slideanimation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('routerAnimations', [
      transition('* => home', pageAnimation),
      transition('* => contacts', pageAnimation),
      transition('* => notfound', pageAnimation)
    ]),
    trigger('changeState', [
      state('green', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('black', style({
        backgroundColor: '#3f3f3f',
        transform: 'scale(1)'
      })),
      state('purple', style({
        backgroundColor: 'purple',
        transform: 'scale(1)'
      })),
      transition('* => green', animate('800ms')),
      transition('* => black', animate('800ms')),
      transition('* => purple', animate('800ms'))
    ])
  ]
})
export class AppComponent implements AfterViewInit {
  switchstate;
  ngAfterViewInit() {
    console.log("AfterInit loaded1");
  }
  setColor(state) {
    this.switchstate = state;
    console.log(state);
  }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation['value'] || null;
  }
}
