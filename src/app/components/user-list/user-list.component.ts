import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: UserModel[] = [];
  public editAllMode = false;

  constructor() { }

  ngOnInit() {
  }

  public onEditAll(): void {
    this.editAllMode = true;
  }

  public onDeleteAll(): void {}
}
