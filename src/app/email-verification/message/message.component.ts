import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    this.http.post('http://localhost:3000/api/user/resendToken', { userId: this.userId, email: this.email }).subscribe((res:any) => {
      console.log(res);
      if (res.message === "Token Send") {
        this.isResend = true;
      }
    });
  }
}
