import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css']
})
export class UserCredentialsComponent implements OnInit {
  User: User = {
    Name: '',
    discription: '',
    about: '',
    follower: [],
    following: [],
    profileImage: ''

  };
  followerNo: any;
  followingNo: any;
  userId: string;
  Name = '';
  Blogs: any;
  isSameUser = false;
  isLoading = true;


  constructor(public userData: UserDataService, public authService: AuthenticationService, public UserData: UserDataService, private http: HttpClient, private route: ActivatedRoute) {

    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);


  }



  ngOnInit() {
    console.log(this.authService.id);
    if (this.userId === this.authService.id) {
      this.isSameUser = true;
    }
    this.http.get('http://localhost:3000/api/user/userInfo' + this.userId).subscribe((userData: any) => {
      const data = userData;
      console.log(data);

      this.User = {
        Name: userData.User.name,
        discription: userData.User.discription,
        about: userData.User.about,
        follower: userData.User.follower,
        following: userData.User.following,
        profileImage: userData.User.profileImage
      };
      this.followerNo = this.User.follower.length;
      this.followingNo = this.User.following.length;
      this.authService.follower = this.User.follower;
      this.authService.following = this.User.following;

      this.isLoading = false;


    });

  }
}
