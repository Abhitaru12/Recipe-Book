import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:	boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5ehRJjMoi4zw-pJdZxFtqK2AgueDsRbA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

  login(email: string, password: string){
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5ehRJjMoi4zw-pJdZxFtqK2AgueDsRbA',
    {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}
