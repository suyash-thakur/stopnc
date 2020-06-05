import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  User: User = {
    Name: '',
    discription: '',
    about: '',
    follower: [],
    following: []
  };

  followerNo: any;
  followingNo; any;
  userId: string;
  Name: string = '';
  Blogs: any;

  constructor(public userData: UserDataService, public authService: AuthenticationService, private http: HttpClient) {
    this.userId = this.authService.id;
    console.log(this.userId);

  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/user/userInfo' + this.userId).subscribe((userData:any) => {
      let data  = userData;
      console.log(data);

      this.User = {
        Name: userData.User.name,
        discription: userData.User.discription,
        about: userData.User.about,
        follower: userData.User.follower,
        following: userData.User.following
      };
      this.followerNo = this.User.follower.length;
      this.followingNo = this.User.following.length;
      console.log(this.User);



      });



    }

}
