import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) { }
  isFollowing: boolean = false;
  notification = [];
  ngOnInit() {
    console.log(this.authService.notification);
  }
  checkIfImg(url) {
    let ext = url.split('.').pop();
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      return true;
    } else if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') {
      return false;
    } else {
      return undefined;
    }
  }
  onFollow(id) {
    this.isFollowing = true;
    this.authService.follow(id);
  }
  onUnFollow(id) {
    this.isFollowing = false;
    this.authService.unfollow(id);
  }
  isFollower(i) {
    if (this.authService.notification[i].originId.following.indexOf(this.authService.id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  clickEachNotification(type, id) {
    console.log(type);
    if (type === 'Post') {
      this.router.navigate(['mobile/blog', id]);
    } else if (type === 'User') {
      this.router.navigate(['mobile/user', id]);
    }
  }
}
