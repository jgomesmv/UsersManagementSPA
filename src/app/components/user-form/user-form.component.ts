import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserModel } from 'src/app/models/user/user.model';
import { ViewModeEnum } from 'src/app/enums/view-mode.enum';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  host: {class: 'c-userForm'}
})
export class UserFormComponent implements OnInit {
  @Input() mode: ViewModeEnum = ViewModeEnum.createMode;
  @Input() user: UserModel = new UserModel({name: ''});
  @Output() public userSubmited = new EventEmitter<UserModel>();
  public userForm: FormGroup;
  public viewModes = ViewModeEnum;

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
    });
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.user = new UserModel(this.userForm.value);
      this.userForm.reset();
      this.userSubmited.emit(this.user);
    }
  }
}
