import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { UserService } from '../_services/users.service';
import { AuthenticationService, TokenPayload } from '../_services/authentication.service';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnInit {
  public showLogin: boolean;
  public showRegister: boolean;
  public submitted: boolean;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public firstname: FormControl;
  public lastname: FormControl;
  public submitLink: String;
  public errorMessage;

  private credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private api: UserService, private auth: AuthenticationService) {
    this.showLogin = false;
    this.submitted = false;
    this.submitLink = "home";
  }

  ngOnInit(): void {
    this.createLoginFormControls();
    this.createLoginForm();
    this.createRegisterFormControls();
    this.createRegisterForm();
  }

  createLoginFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    });
  }

  createRegisterFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ], this.isEmailUnique.bind(this));
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.firstname = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.lastname = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
  }

  isEmailUnique(control: FormControl) {
    console.log(control.value);
    this.credentials.email = control.value;
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.auth.isEmailRegisterd(this.credentials).subscribe((data) => {
          if (data.isEmailUnique === false) {
            resolve({ 'isEmailUnique': true });
          } else {
            resolve(null);
          }
        });
      }, 100);
      setTimeout(() => reject(new Error("Error Occured")), 2000); //will be ignored if there is no errors
    });
    return promise;
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  open() {
    this.showLogin = true;
  }

  openRegister() {
    this.loginForm.reset();
    this.showLogin = false;
    this.showRegister = true;
  }

  openLogin() {
    this.registerForm.reset();
    this.showRegister = false;
    this.showLogin = true;
  }

  close() {
    this.loginForm.reset();
    this.registerForm.reset();
    this.showLogin = false;
    this.showRegister = false;
    console.log("closed");
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.auth.login(this.credentials).subscribe((result) => {
        if (result.success == true) {
          this.loginForm.reset();
          this.showLogin = false;
          this.router.navigateByUrl('/boards');
        } else {
          this.loginForm.reset();
          this.errorMessage = 'Details are invalid!';
        }
      }, (err) => {
        console.error(err);
      });
      console.log("Login Form Submitted!");
    } else if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe(() => {
        //this.router.navigateByUrl('/profile');
        this.router.navigateByUrl('/boards');
      }, (err) => {
        console.error(err);
      });
      console.log("Register Form Submitted!");
      this.registerForm.reset();
      this.showRegister = false;
    }
  }

}
