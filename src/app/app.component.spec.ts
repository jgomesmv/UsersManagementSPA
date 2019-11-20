import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { UsersDataSource } from './data-sources/users/users.data-source';
import { of } from 'rxjs';

describe('AppComponent', () => {
  const testUser = {name: 'testUser'};

  const usersDataSourceMock = {
    connect: () => of([testUser]),
    disconnect: () => {},
    addUser: (user: any) => {}
  };

  let fixture: any;
  let app: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        UserListItemComponent,
        UserFormComponent,
        UserListComponent
      ],
      providers: [
        { provide: UsersDataSource, useValue: usersDataSourceMock },
      ]
    }).compileComponents();

    fixture =  TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should add the user', () => {
    const addUserSpy = spyOn(
      TestBed.get(UsersDataSource),
      'addUser'
    );
    app.onAddUser(testUser);
    expect(addUserSpy).toHaveBeenCalled();
  });

  it('gets users on init', () => {
    app.ngOnInit();
    expect(app.users).toContain(testUser);
  });

  it('disconnects on destroy', () => {
    const disconnectSpy = spyOn(
      TestBed.get(UsersDataSource),
      'disconnect'
    );

    app.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
