import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null as any);

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5ehRJjMoi4zw-pJdZxFtqK2AgueDsRbA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  login(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5ehRJjMoi4zw-pJdZxFtqK2AgueDsRbA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  logout() {
    this.user.next(null as any);
    this.router.navigate(['/auth'])
  }

  autoLogin() {
    const userDataJson: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userdata') ?? 'null');

    if (!userDataJson) {
      return;
    }

    const loadedUser = new User(userDataJson.email, userDataJson.id, userDataJson._token, new Date(userDataJson._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }


  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userdata', JSON.stringify(user));
  }
}
