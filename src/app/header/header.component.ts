import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { from, Subscription } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { UserDataService } from '../services/user-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   authListenerSub: Subscription;

  loggedin = false;
  userId: string;
  User: User;
  Name = ' ';
  ProfileImg = 'https://stopnc.s3.ap-south-1.amazonaws.com/profilepicture/icons8-male-user-100.png';
  NOtification: Array<any>;
  numberNot = 0;
  isdataLoaded = false;
  query: any;

  constructor( public authService: AuthenticationService, public userData: UserDataService, private http: HttpClient,  private router: Router) {
    this.loggedin = this.authService.Userlogin;
    this.userId = this.authService.id;
}


user() {

    console.log('user');
  }

signOut() {
  this.authService.logout();
}

  ngOnInit() {
    if (this.loggedin) {
      this.http.get('http://localhost:3000/api/user/userInfo' + this.userId).subscribe((userData:any) => {
        let data  = userData;
        console.log(data);
        this.authService.emitConfig(userData.User);
      console.log(this.authService.user);
        this.User = {
          Name: userData.User.name,
          discription: userData.User.discription,
          about: userData.User.about,
          follower: userData.User.follower,
          following: userData.User.following,
          profileImage: userData.User.profileImage
        };
        this.Name = this.User.Name;
        this.userData.User = this.User;
        this.ProfileImg = userData.User.profileImage;
        this.NOtification = data.Notification;
        this.authService.notification = this.NOtification;
        this.NOtification.forEach(n => {
          if (!n.isRead)
          this.numberNot = this.numberNot + 1;
        });
        console.log(this.numberNot);
        this.authService.userData.subscribe(val => {
          this.Name = val.Name;
          this.ProfileImg = val.profileImage;

        });
        this.isdataLoaded = true;
      });
    }
  }
notificationClick(){
  if(this.numberNot != 0){
    this.http.post('http://localhost:3000/api/user/notficationSeen' + this.authService.id, null).subscribe(result => {
      console.log(result);
      this.numberNot = 0;
    });

  }

}
clickEachNotification(type, id) {
  console.log(type);
  if (type === 'Post') {
  this.router.navigate(['/blog', id]);
  } else if (type === 'User') {
    this.router.navigate(['/user'], id);
  }
}
  search() {
    console.log(this.query);
    this.http.get('http://localhost:3000/api/user/searchBlog/' + this.query + '/' + 0).subscribe(res => {
      console.log(res);
    });
  }
}
