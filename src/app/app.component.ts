import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';
import { pageAnimation } from './_animations/slideanimation/slideanimation.component';
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
      transition('* => green', animate('800ms')),
      transition('* => black', animate('800ms')),
      transition('* => purple', animate('800ms'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  switchstate;
  loginModal: boolean;
  constructor() {
    this.loginModal = false;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    console.log("AfterInit loaded1");
  }
  setColor(state) {
    this.switchstate = state;
    console.log(state);
  }
  openModal() {
    this.loginModal = true;
  }
  closeModal() {
    this.loginModal = false;
  }
  employeeAddressForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    address: new FormGroup({
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    })
  });
  submitted = false;
  onSubmit() {
    this.closeModal();
  }
  addNewEmployeeAddress() {
    this.employeeAddressForm.reset();
    this.submitted = false;
  }
  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    console.log(animation['value']);
    return animation['value'] || null;
  }
}
