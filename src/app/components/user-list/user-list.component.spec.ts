import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from './user-list.component';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { UsersDataSource } from 'src/app/data-sources/users/users.data-source';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const usersDataSourceMock = {
    removeAllUsers: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ],
      declarations: [
        UserListComponent,
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
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass to editAll mode onEditAll', () => {
    component.onEditAll();
    expect(component.mode).toEqual(component.viewModes.editAllMode);
  });

  it('should remove all users onDeleteAll', () => {
    const removeAllUsersSpy = spyOn(
      TestBed.get(UsersDataSource),
      'removeAllUsers'
    );
    component.onDeleteAll();
    expect(removeAllUsersSpy).toHaveBeenCalled();
  });

  it('should pass to view mode onSaveAll', () => {
    component.onSaveAll();
    expect(component.mode).toEqual(component.viewModes.view);
  });
});
