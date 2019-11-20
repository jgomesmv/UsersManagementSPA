import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListItemComponent } from './user-list-item.component';
import { UsersDataSource } from 'src/app/data-sources/users/users.data-source';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;

  const testUser = {name: 'testUser', previousName: null};

  const usersDataSourceMock = {
    updateUser: (user: any) => {},
    removeUser: (user: any) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        UserListItemComponent,
        UserFormComponent
      ],
      providers: [
        { provide: UsersDataSource, useValue: usersDataSourceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.user = testUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass to edit mode after onEdit', () => {
    component.onEdit();
    expect(component.mode).toEqual(component.viewModes.editMode);
  });

  it('should remove user after onDelete', () => {
    const removeUserSpy = spyOn(
      TestBed.get(UsersDataSource),
      'removeUser'
    );
    component.onDelete();
    expect(removeUserSpy).toHaveBeenCalled();
  });

  it('should update user after onUserUpdated', () => {
    const updateUserSpy = spyOn(
      TestBed.get(UsersDataSource),
      'updateUser'
    );

    const updatedUser = {name: 'testUserUpdated', previousName: null};
    component.onUserUpdated(updatedUser);
    expect(updateUserSpy).toHaveBeenCalled();
    expect(updatedUser.previousName).toBe(component.user.name);
  });
});
