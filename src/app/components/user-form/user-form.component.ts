import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  host: {class: 'c-userForm'}
})
export class UserFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() user: UserModel = new UserModel({name: ''});
  @Output() public userSubmited = new EventEmitter<UserModel>();
  public userForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name),
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.user = new UserModel(this.userForm.value);
      this.userSubmited.emit(this.user);
    }
  }
}
