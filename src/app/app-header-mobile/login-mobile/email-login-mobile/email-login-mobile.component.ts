import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-login-mobile',
  templateUrl: './email-login-mobile.component.html',
  styleUrls: ['./email-login-mobile.component.css']
})
export class EmailLoginMobileComponent implements OnInit {

  private authListenerSub: Subscription;
  private loggedin = false;
  isWrongCred = false;
  isEmailValid = true;
  isNameValid = true;
  isPasswordValid = true;
 emailValidExpe : RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  nameValidExpe: RegExp = new RegExp(/^[A-Za-z]+$/);
  passwordValidExpe: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  onLogin(email: string, password: string) {
    console.log( this.emailValidExpe.test(email));
    if (!this.emailValidExpe.test(email)) {
      this.isEmailValid = false;
    } else {
      this.isEmailValid = true;
      this.authService.login(email, password);
      this.authListenerSub = this.authService.getauthStatusListener().subscribe(
        isAuthenticated => {
          this.loggedin = isAuthenticated;
          console.log(this.loggedin);
          if (this.loggedin) {
            this.authService.Userlogin = true;
            this.router.navigate(['/']);
          }
        });
    }
  }
  onSignup(email: string, password: string, firstname: string, lastname: string) {
    if (email === '' && password === '' && firstname === '') {

      window.alert('Please input correct value');
      return;
    } else {
      this.isPasswordValid = true;
      this.isNameValid = true;
      this.isEmailValid = true;

      if (!this.nameValidExpe.test(firstname) && !this.nameValidExpe.test(lastname)) {
        this.isNameValid = false;
        return;
      }
      if (!this.emailValidExpe.test(email)) {
        this.isEmailValid = false;
        return;
      }
      if (!this.passwordValidExpe.test(password)) {
        this.isPasswordValid = false;
        return;
      }

      if (this.isEmailValid && this.isNameValid && this.isPasswordValid) {
        const name = firstname + ' ' + lastname;
        this.authService.createUser(email, password, name).then(res => {

        });

      }
  }
}

  public scroll(element: any) {
  }
}
