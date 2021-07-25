import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
    following: [],
    profileImage: ''
  };

  followerNo: any;
  followingNo: any;
  userId: string;
  Name = '';
  Blogs: any;
  isSameUser = false;

  constructor(public userData: UserDataService, public authService: AuthenticationService,
    private http: HttpClient, private route: ActivatedRoute, public router: Router) {
    if (window.innerWidth <= 991) {
      this.router.navigate(['mobile/user/profile/' + route.snapshot.params.id]);
    }
    this.route.params.subscribe(params => {
      this.userId = params.id;
      // console.log(this.userId);
      // console.log(this.authService.id);
      if (this.userId === this.authService.id) {
        this.isSameUser = true;
      }
      this.http.get(environment.backendLink + 'api/user/userInfo' + this.userId).subscribe((userData: any) => {
        const data = userData;
        // console.log(data);

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




      });

    });


  }

  ngOnInit() {



  }
}
