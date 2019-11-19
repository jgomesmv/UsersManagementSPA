import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersDataSource {
  private usersSubject = new BehaviorSubject<UserModel[]>(null);

  constructor(private usersService: UsersService) { }

  public connect(): Observable<UserModel[]> {
    if (!this.usersSubject.value) {
      this.getUsers();
    }

    return this.usersSubject.asObservable().pipe(
      skipWhile((users) => {
        return users ? false : true;
      })
    );
  }

  public disconnect(): void {
    this.usersSubject.complete();

    this.usersSubject = new BehaviorSubject<UserModel[]>(null);
  }

  public updateUsers(users: UserModel[]): void {
    this.usersSubject.next(users);
  }

  public addUser(user: UserModel): void {
    const users = this.usersSubject.value;
    users.push(user);
    this.updateUsers(users);
  }

  public removeUser(user: UserModel): void {
    const users = this.usersSubject.value.filter(u => u.name !== user.name);
    this.updateUsers(users);
  }

  public updateUser(user: UserModel): void {
    const users = this.usersSubject.value.filter(u => u.name !== user.previousName);
    users.push(user);
    this.updateUsers(users);
  }

  private getUsers(): void {
    this.usersService.get().subscribe(
      (users) => {
        this.updateUsers(users);
      },
      (error) => {
        this.usersSubject.error(error);
      }
    );
  }
}
