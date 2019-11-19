import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserModel } from './models/user/user.model';
import { UsersDataSource } from 'src/app/data-sources/users/users.data-source';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public users: UserModel[] = [];

  constructor(private usersDataSource: UsersDataSource) { }

  ngOnInit() {
    this.usersDataSource.connect().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.usersDataSource.disconnect();
  }
}
