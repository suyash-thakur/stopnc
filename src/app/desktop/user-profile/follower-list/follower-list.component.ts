import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {
  userId: string;
  followers: Array<any> = [];
  isSameUser: boolean = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) {
    const url = this.router.url.split("/");
    this.userId = url.slice(-2, -1)[0];
    console.log(this.userId);
   }

  ngOnInit() {
    console.log(this.authService.id)

    if (this.userId === this.authService.id) {
      this.isSameUser = true;
    }
    this.http.get(environment.backendLink + 'api/user/followers' + this.userId).subscribe((followers: any) => {
      this.followers = followers.followers.follower;
      console.log(this.followers);
    });
  }
  removeFollower(id, i) {
    const Id = {
      followerId: this.authService.id
    };
    this.http.put(environment.backendLink + 'api/user/removefollower' + id, Id).subscribe((responce: any) => {
      this.followers.splice(i, 1);

  });
  }
}
