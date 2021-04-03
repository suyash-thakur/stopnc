import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  isResend = false;
  email: any = '';
  userId: any;
  token: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.token = params.token;

    });
    this.authService.verifyEmail(this.userId, this.token).then((res) => {
    });
  }
  resend() {
    this.http.post('http://localhost:3000/api/user/resendToken', { userId: this.userId, email: this.email }).subscribe((res: any) => {
      console.log(res);
      if (res.message === 'Token Send') {
        this.isResend = true;
      }
    });
  }
}
