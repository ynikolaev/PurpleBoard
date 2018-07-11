import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  @ViewChild(RegisterDialogComponent) registerModal: RegisterDialogComponent;

  showLogin: boolean;
  submitted: boolean;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor() {
    this.showLogin = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  open() {
    this.showLogin = true;
  }

  openRegister() {
    this.registerModal.open();
    this.showLogin = false;
  }

  close() {
    this.loginForm.reset();
    this.showLogin = false;
    console.log("closed");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form Submitted!");
      this.loginForm.reset();
    }
  }

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

}
