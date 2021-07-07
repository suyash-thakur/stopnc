import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  isVerfied: any;
  email: any = '';
  userId: any;
  isResend = false;
  isAlreadyVerified = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isVerfied = localStorage.getItem('isVerfied');
    if (this.isVerfied === 'true') {
      console.log('email already verified');
    }
    this.email = localStorage.getItem('emailVerify');
    console.log(this.email);
    this.userId = localStorage.getItem('idVerify');

  }
  resend() {
    let isVerified = localStorage.getItem('isVerfied');
    if (isVerified === 'false') {
      this.http.post(environment.backendLink + 'api/user/resendToken', { userId: this.userId, email: this.email }).subscribe((res: any) => {
        console.log(res);
        if (res.message === "Token Send") {
          this.isResend = true;
        }
      });
    } else {
      this.isAlreadyVerified = true;
    }
  }
}
