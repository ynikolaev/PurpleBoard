import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  showRegister = false;
  constructor() { }

  ngOnInit() {

  }
  
  open() {
    console.log("In reg module open");
    this.showRegister = true;
  }

  close() {
    this.showRegister = false;
  }

}
