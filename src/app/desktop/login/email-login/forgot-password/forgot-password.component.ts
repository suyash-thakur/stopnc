import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  userId: string;
  errMsg = '';
  passwordValidExpe: RegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  token: string;
  isChecked = false;
  isValid = false;
  isPasswordUpdated = false;
  isPasswordValid = true;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.token = params.token;
      this.http.get('http://localhost:3000/api/user/checkEmail/' + this.userId + '/' + this.token).subscribe((res: any) => {
        console.log(res);
        if (res.status === 0) {
          this.isChecked = true;
        } else if (res.status === 1) {
          this.isChecked = true;
          this.isValid = true;
        }
      });
    });
  }
  updatePassword(password, confirmPassword) {
    console.log(password, confirmPassword);
    if (!this.passwordValidExpe.test(password)) {
      this.isPasswordValid = false;
      this.errMsg = 'Password must contains minimum eight characters, at least one letter and one number';
      return;
    }
    if (password !== confirmPassword) {
      this.isPasswordValid = false;
      this.errMsg = 'Password does not match';

      return;
    }
    this.http.put('http://localhost:3000/api/user/updatePassword/' + this.userId, {
      password: password
    }).subscribe((res) => {
      console.log(res);
      this.isPasswordUpdated = true;
    });
  }

}
