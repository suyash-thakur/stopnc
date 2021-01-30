import { Component,  OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authService.notification);
  }

}
