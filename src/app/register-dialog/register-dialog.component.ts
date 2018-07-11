import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  showRegister: boolean;
  submitted: boolean;
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  firstname: FormControl;
  lastname: FormControl;

  constructor() {
    this.showRegister = false;
    this.submitted = false;
  }

  ngOnInit() {
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
    this.firstname = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.lastname = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Form Submitted!");
      this.registerForm.reset();
      this.showRegister = false;
    }
  }

  open() {
    console.log("In reg module open");
    this.showRegister = true;
  }

  close() {
    this.registerForm.reset();
    this.showRegister = false;
    console.log("closed");
  }

}
