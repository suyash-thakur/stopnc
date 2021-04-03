import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {

  private authListenerSub: Subscription;
  private loggedin = false;
  isWrongCred = false;
  isEmailValid = true;
  isNameValid = true;
  isPasswordValid = true;
 emailValidExpe : RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  nameValidExpe: RegExp = new RegExp(/^[A-Za-z]+$/);
  passwordValidExpe: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  ngOnInit() {
  }
  constructor(public authService: AuthenticationService, private router: Router) {}

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
  onLogin(email: string, password: string) {
    console.log( this.emailValidExpe.test(email));
    if (!this.emailValidExpe.test(email)) {
      this.isEmailValid = false;
      return;
    } else {
      this.isEmailValid = true;
      return;

    }

    if (this.isEmailValid === true) {
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

}
