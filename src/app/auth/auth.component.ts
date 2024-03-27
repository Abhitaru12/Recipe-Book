import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, authResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  form!: FormGroup;
  submitted = false;
  isLoading = false;
  error: any = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initialize();
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  initialize() {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit() {
    this.submitted = true;
    const email = this.fv.email;
    const password = this.fv.password;

    if (this.form.invalid) {
      return;
    }
    
    let authOb : Observable<authResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authOb = this.authService.login(email, password)
    } else {
      authOb = this.authService.signup(email, password)
    }

    authOb.subscribe(res => {
      console.log(res);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.error = error.error.error.message;
      this.isLoading = false;
    })
    this.form.reset();
    this.submitted = false;
    this.error = null;
  }
}
