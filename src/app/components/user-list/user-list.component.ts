import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from 'src/app/models/user/user.model';
import { UsersDataSource } from 'src/app/data-sources/users/users.data-source';
import { ViewModeEnum } from 'src/app/enums/view-mode.enum';

@Component({
  selector: 'users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  host: {class: 'c-usersList'}
})
export class UserListComponent implements OnInit {
  @Input() users: UserModel[] = [];
  public mode: ViewModeEnum = ViewModeEnum.view;
  public viewModes = ViewModeEnum;

  constructor(private usersDataSource: UsersDataSource) { }

  ngOnInit() {
  }

  public onEditAll(): void {
    this.mode = ViewModeEnum.editAllMode;
  }

  public onDeleteAll(): void {
    this.usersDataSource.removeAllUsers();
  }

  public onSaveAll(): void {
    // TODO
    this.mode = ViewModeEnum.view;
  }
}
