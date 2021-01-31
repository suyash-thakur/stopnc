import { Component,  OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }
  isFollowing: boolean = false;
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
}
