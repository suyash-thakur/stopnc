import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-profile-mobile',
  templateUrl: './user-profile-mobile.component.html',
  styleUrls: ['./user-profile-mobile.component.css']
})
export class UserProfileMobileComponent implements OnInit {
  @ViewChild('imageInput', {static: true}) el:ElementRef;

  authListenerSub: Subscription;
  imageObj: any;

  loggedin = false;
  userId: string;
  User: User;
  Name = ' ';
  profileImg = '';

  constructor(private router: Router, public authService: AuthenticationService, public UserData: UserDataService) {
    this.loggedin = this.authService.Userlogin;
    this.userId = this.authService.id;
    if (this.UserData.User !== undefined) {
      this.User = this.UserData.User;
      this.Name = this.User.Name;
      this.profileImg = this.User.profileImage;

    }
   }

  ngOnInit() {
    this.UserData.configObservable.subscribe(val => {
      this.User = val;
      this.Name = this.User.Name;
      this.profileImg = this.User.profileImage;

    });

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/mobile/login']);
  }

  }


