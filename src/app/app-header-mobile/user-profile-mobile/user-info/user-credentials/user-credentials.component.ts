import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  userId: string;
  Name: string;
  profileImage= ''


  constructor(public userData: UserDataService, public authService: AuthenticationService, public UserData: UserDataService) {

    if (this.UserData.User !== undefined) {
      this.User = this.UserData.User;
      this.Name = this.User.Name;
      this.profileImage = this.User.profileImage;

    }


}



ngOnInit() {
  this.UserData.configObservable.subscribe(val => {
    if (val !== undefined) {
      this.User = val;
      this.Name = this.User.Name;
      this.profileImage = this.User.profileImage;

    }

  });
  console.log(this.User);

}

}
