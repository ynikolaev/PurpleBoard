import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';
import { pageAnimation } from './_animations/slideanimation/slideanimation.component';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('routerAnimations', [
      transition('* => home', pageAnimation),
      transition('* => contacts', pageAnimation),
      transition('* => admin', pageAnimation),
      transition('* => purpleboard', pageAnimation),
      transition('* => notfound', pageAnimation)
    ]),
    trigger('changeState', [
      state('green', style({
        backgroundColor: '#006400',
        transform: 'scale(1)'
      })),
      state('black', style({
        backgroundColor: '#3f3f3f',
        transform: 'scale(1)'
      })),
      state('purple', style({
        backgroundColor: '#660066',
        transform: 'scale(1)'
      })),
      state('red', style({
        backgroundColor: 'red',
        transform: 'scale(1)'
      })),
      state('blue', style({
        backgroundColor: 'darkblue',
        transform: 'scale(1)'
      })),
      transition('* => green', animate('800ms')),
      transition('* => black', animate('800ms')),
      transition('* => purple', animate('800ms')),
      transition('* => red', animate('800ms')),
      transition('* => blue', animate('800ms'))
    ])
  ]
})
export class AppComponent {
  @ViewChild(LoginDialogComponent) loginModal: LoginDialogComponent;
  @ViewChild(RegisterDialogComponent) registerModal: RegisterDialogComponent;
  switchstate;
  closestate;
  constructor() {

  }
  setColor(state) {
    this.switchstate = state;
    window.scrollTo(0, 0);
    //console.log(state);
  }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    //console.log(animation['value']);
    return animation['value'] || null;
  }
}
