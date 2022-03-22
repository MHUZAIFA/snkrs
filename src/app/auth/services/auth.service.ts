import { Location, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject(false);
  private _loggedInUser = new BehaviorSubject(new User('', '', ''));

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  get loggedInUser$(): Observable<User> {
    return this._loggedInUser.asObservable();
  }

  get loggedInUser(): User {
    return this._loggedInUser.getValue();
  }

  constructor(private _snackBar: MatSnackBar, private _location: Location, private _titleCasePipe: TitleCasePipe) {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify([]));
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!!loggedInUser) {
      const user: User = JSON.parse(localStorage.getItem('loggedInUser') as string) as User;
      this._isLoggedIn.next(true);
      this._loggedInUser.next(user);
    }
  }

  register(newUser: User) {
    const user = new User(newUser.email.toLowerCase().trim(), newUser.password.toLowerCase().trim(), newUser.name?.toLowerCase().trim(),)
    const stream = localStorage.getItem('users') as string;
    const users = JSON.parse(stream) as User[];
    const index = users.findIndex(u => u.email.toLowerCase().trim() === user.email.toLowerCase().trim());

    if (index !== -1) {
      alert('User Already Exists');
    } else {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this._isLoggedIn.next(true);
      this._loggedInUser.next(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this._location.back();
      this._snackBar.open(`Thank you ${this._titleCasePipe.transform(user.name)} for registering!`, 'dismiss', { duration: 2000 });
    }
  }

  login(user: User) {
    const stream = localStorage.getItem('users') as string;
    const users = JSON.parse(stream) as User[];
    const index = users.findIndex(u => u.email.toLowerCase().trim() === user.email);

    if (index === -1) {
      alert('User Doesnot Exists');
    } else {
      const registeredUser = users.find(u => u.email.toLowerCase().trim() === user.email);
      if (user.password === registeredUser?.password) {
        this._isLoggedIn.next(true);
        this._loggedInUser.next(registeredUser);
        localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        this._location.back();
        this._snackBar.open(`Welcome back ${this._titleCasePipe.transform(registeredUser.name)}!`, 'dismiss', { duration: 2000 });
      } else {
        alert('Incorrect username or password');
      }
    }
  }

  logout() {
    this._isLoggedIn.next(false);
    this._loggedInUser.next(new User('', '', ''));
    localStorage.setItem('loggedInUser', '');
  }

  askToLogin() {
    document.getElementById('login-btn')?.click();
  }


}
