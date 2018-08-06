import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';
import { pageAnimation } from './_animations/slideanimation/slideanimation.component';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  ActivatedRoute,
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('routerAnimations', [
      transition('* => home', pageAnimation),
      transition('* => profile', pageAnimation),
      transition('* => admin', pageAnimation),
      transition('* => purpleboard', pageAnimation),
      transition('* => notfound', pageAnimation)
    ]),
    trigger('changeState', [
      state('green', style({
        backgroundColor: '#004f00',
        transform: 'scale(1)'
      })),
      state('black', style({
        backgroundColor: '#3f3f3f',
        transform: 'scale(1)'
      })),
      state('purple', style({
        backgroundColor: '#3D1255',
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
export class AppComponent implements OnInit {
  @ViewChild(LoginDialogComponent) loginModal: LoginDialogComponent;
  public router;
  public switchstate;
  public color: String;
  public board_id: any;

  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef, public auth: AuthenticationService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this.color = "#d5d5d5";
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
  setColor(state) {
    this.switchstate = state;
    this.color = state;
    if (state == "black") {
      //console.log("state is black");
      this.color = "#d5d5d5";
    } else if (state == "purple") {
      this.color = "#c698f0";
    } else if (state == "green") {
      this.color = "#98FB98";
    } else if (state == "blue") {
      this.color = "#ADD8E6";
    }
    //window.scrollTo(0, 0);
    //console.log(state);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    if (animation['value'] == "profile") {
      this.setColor("green");
    } else if (animation['value'] == "purpleboard") {
      this.setColor("purple");
    } else if (animation['value'] == "admin") {
      this.setColor("blue");
    } else if (animation['value'] == "home") {
      this.setColor("black");
    }
    //console.log(animation['value']);
    return animation['value'] || null;
  }
}
