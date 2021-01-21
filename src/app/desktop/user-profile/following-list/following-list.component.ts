import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {
  userId: string;
  following: Array<any> = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/user/following' + this.authService.id).subscribe((followers: any) => {
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
