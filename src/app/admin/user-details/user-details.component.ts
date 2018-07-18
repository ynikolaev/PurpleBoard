import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user = {};
  constructor(private route: ActivatedRoute, private api: UserService) { }

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params['id']);
  }

  getUserDetails(id) {
    this.api.getUser(id)
      .subscribe(data => {
        console.log(data);
        this.user = data;
      });
  }

}
