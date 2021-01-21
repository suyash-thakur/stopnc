import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {
  userId: string;
  followers: Array<any> = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthenticationService) {

   }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/user/followers' + this.authService.id).subscribe((followers: any) => {
      this.followers = followers.followers.follower;
      console.log(this.followers);
    });
  }
  removeFollower(id, i) {
    const Id = {
      followerId: this.authService.id
    };
    this.http.put('http://localhost:3000/api/user/removefollower' + id, Id).subscribe ((responce:any) => {
      this.followers.splice(i, 1);

  });
  }
}
