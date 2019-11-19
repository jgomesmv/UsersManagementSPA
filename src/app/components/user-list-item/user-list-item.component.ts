import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  host: { class: 'c-userListItem' }
})
export class UserListItemComponent implements OnInit {
  @Input() user: UserModel;

  constructor() { }

  ngOnInit() {
  }

  public onEdit(): void {}

  public onDelete(): void {}
}
