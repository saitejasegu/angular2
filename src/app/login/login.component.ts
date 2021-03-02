import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitMessage: string;
    username = new FormControl();
    password = new FormControl();
    loginform = new FormGroup({
      'username': this.username,
      'password': this.password
    });
    formGroupDirective: FormGroupDirective;
    constructor( private formBuilder: FormBuilder, private authService: AuthenticationService, private routerService: RouterService ) {
    this.loginform = this.formBuilder.group({
        username: ['', Validators.compose([Validators.minLength(2), Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
      });
      this.username = this.loginform.value.username;
      this.password = this.loginform.value.password;
    }
    loginSubmit() {
    const data = {'username' : this.loginform.value.username, 'password' : this.loginform.value.password};
    this.authService.authenticateUser(data).subscribe(res => {
      this.authService.setBearerToken(res['token']);
      console.log(data);
      this.loginform.reset();
      this.routerService.routeToDashboard();
    }, err => {
      this.loginform.reset();
      if ( err.status === 403) {
        this.submitMessage = err.error.message;
        console.log('Invalid credentials');
      }else {
        this.submitMessage = err.message;
        console.log('404 error');
      }
    }
    );
    }
}