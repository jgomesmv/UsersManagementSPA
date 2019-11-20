import { TestBed, async } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { UsersDataSource } from './users.data-source';
import { UsersService } from 'src/app/services/users/users.service';

describe('UsersDataSourceService', () => {
  const testUser = {name: 'testUser', previousName: null};

  const usersServiceMock = {
    get: () => of([testUser]),
  };

  let dataSource: UsersDataSource;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
      ]
    });
  }));

  beforeEach(() => {
    dataSource = TestBed.get(UsersDataSource);
  });

  it('should be created', () => {
    expect(dataSource).toBeTruthy();
  });

  it('should return a users observable array when connect', () => {
    const spySearch = spyOn(
      (dataSource as any),
      'getUsers'
    ).and.returnValue(of([]));

    dataSource.connect().subscribe(
      (users) => {
        expect(users).toBe(jasmine.arrayContaining([testUser]));
      }
    );

    expect(spySearch).toHaveBeenCalled();
  });

  it('should return null observable when disconnect', () => {
    dataSource.disconnect();
    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data).toBeNull();
      }
    );
  });

  it('should return observable array with the new users array', () => {
    const updatedUsersArray = [testUser, testUser];
    dataSource.updateUsers(updatedUsersArray);
    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(2);
        expect(data[0]).toEqual(testUser);
        expect(data[1]).toEqual(testUser);
      }
    );
  });

  it('should return observable array with the new user added', () => {
    const usersArray = [testUser];
    dataSource.updateUsers(usersArray);

    const newUser = {name: 'newUserTest', previousName: null};
    dataSource.addUser(newUser);

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(2);
        expect(data[0]).toEqual(testUser);
        expect(data[1]).toEqual(newUser);
      }
    );
  });

  it('should return observable array without the user removed', () => {
    const usersArray = [testUser];
    dataSource.updateUsers(usersArray);
    dataSource.removeUser(testUser);

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(0);
      }
    );
  });

  it('should return observable array with the user updated', () => {
    const usersArray = [testUser];
    dataSource.updateUsers(usersArray);

    const updatedUser = {name: 'updatedUserTest', previousName: testUser.name};
    dataSource.updateUser(updatedUser);

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(1);
        expect(data[0]).toEqual(updatedUser);
      }
    );
  });

  it('should return observable with empty array when removeAllUsers', () => {
    const usersArray = [testUser];
    dataSource.updateUsers(usersArray);

    dataSource.removeAllUsers();

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(0);
      }
    );
  });

  it('should return observable array with the testUser when getUsers', () => {
    (dataSource as any).getUsers();

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        expect(data.length).toBe(1);
        expect(data[0]).toEqual(testUser);
      }
    );
  });

  it('should return error when service throws error', () => {
    const usersService = TestBed.get(UsersService);
    const mockGet = spyOn(usersService, 'get').and.returnValue( throwError('error!'));

    (dataSource as any).getUsers();
    expect(mockGet).toHaveBeenCalled();

    (dataSource as any).usersSubject.asObservable().subscribe(
      (data) => {
        fail('Should be procesed on the error handler');
      },
      (error) => {
        expect(true);
      }
    );
  });
});
