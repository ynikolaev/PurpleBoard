import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/users.service';
import { AuthenticationService, TokenPayload } from '../_services/authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  showLogin: boolean;
  showRegister: boolean;
  submitted: boolean;
  loginForm: FormGroup;
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  firstname: FormControl;
  lastname: FormControl;
  submitLink: String;

  credentials: TokenPayload = {
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
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.auth.isEmailRegisterd(this.credentials).subscribe((data) => {
          console.log(data.message);
          resolve(null);
        }, () => { resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });
    console.log(q);
    return q;
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
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.auth.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/purpleboard');
      }, (err) => {
        console.error(err);
      });
      console.log("Login Form Submitted!");
      this.loginForm.reset();
      this.showLogin = false;
    } else if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe(() => {
        //this.router.navigateByUrl('/profile');
      }, (err) => {
        console.error(err);
      });
      console.log("Register Form Submitted!");
      this.registerForm.reset();
      this.showRegister = false;
    }
  }

}
