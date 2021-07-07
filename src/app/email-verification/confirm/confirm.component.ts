import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from '../../../environments/environment';

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
  isAlreadyVerified = false;
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
    let isVerified = localStorage.getItem('isVerfied');
    if (isVerified === 'false') {
      this.http.post(environment.backendLink + 'api/user/resendToken', { userId: this.userId, email: this.email }).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'Token Send') {
          this.isResend = true;
        }
      });
    } else {
      this.isAlreadyVerified = true;
    }

  }
}
