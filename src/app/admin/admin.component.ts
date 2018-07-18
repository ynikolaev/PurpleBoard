import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/users.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any;
  displayedColumns = ['id', 'email', 'firstname', 'lastname', 'regDate'];
  constructor(private userService: UserService) { }
  dataSource = new UserDataSource(this.userService);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.userService.getUsers()
      .subscribe(res => {
        console.log(res);
        this.users = res;
        this.users.paginator = this.paginator;
      }, err => {
        console.log(err);
      });
  }
}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super()
  }

  connect() {
    return this.userService.getUsers();
  }

  disconnect() {

  }
}
