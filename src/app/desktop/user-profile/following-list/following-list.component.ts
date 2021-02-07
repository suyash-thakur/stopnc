import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {
  userId: string;
  following: Array<any> = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) {
    const url = this.router.url.split("/");
    this.userId = url.slice(-2, -1)[0];
    console.log(this.userId);
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/user/following' + this.userId).subscribe((followers: any) => {
      this.following = followers.followers.following;
      console.log(this.following);
    });
  }
  unfollow(followerId, index) {
    const Id = {
      followerId: this.authService.id
    };
    console.log(followerId);
    console.log(Id);
    this.http.put('http://localhost:3000/api/user/unfollow' + followerId, Id).subscribe (responce => {
          this.following.splice(index, 1);
    });
  }
}
