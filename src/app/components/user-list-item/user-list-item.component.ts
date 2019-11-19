import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from 'src/app/models/user/user.model';
import { UsersDataSource } from 'src/app/data-sources/users/users.data-source';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  host: { class: 'c-userListItem' }
})
export class UserListItemComponent implements OnInit {
  @Input() public user: UserModel;
  @Input() public editMode = false;

  constructor(private usersDataSource: UsersDataSource) { }

  ngOnInit() {
  }

  public onEdit(): void {
    this.editMode = true;
  }

  public onDelete(): void {
    this.usersDataSource.removeUser(this.user);
  }

  public onUserUpdated(user: UserModel): void {
    user.previousName = this.user.name;
    this.usersDataSource.updateUser(user);
    this.editMode = false;
  }
}
