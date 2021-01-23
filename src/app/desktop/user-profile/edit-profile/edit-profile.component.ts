import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {  HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('imageInput', {static: true}) el:ElementRef;
 name: string ;
  cridential: string;
  about: string;
  id: string;
  profileImg: string;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public User: UserDataService, public auth: AuthenticationService, private http: HttpClient, private router: Router) {

   }

  ngOnInit() {
    this.name = this.auth.user.name;
    this.cridential = this.auth.user.discription;
    this.about = this.auth.user.about;
    this.profileImg = this.auth.user.profileImage;
    console.log(this.name);

    this.auth.userData.subscribe(val => {
      this.name = val.name;
      this.cridential = val.discription;
      this.about = val.about;
      this.profileImg = val.profileImage;
      console.log(this.name);
    });
  }
  editUser() {
    console.log(this.auth.id);
    const user = {
      id: this.auth.id,
      name: this.name,
      cridential: this.cridential,
      about: this.about,
      profileImg: this.profileImg
    };
    this.http.put('http://localhost:3000/api/user/userUpdate' + this.auth.id, user).subscribe(response => {
      console.log(response);

      this.router.navigate(['/user/' + this.auth.id]);

    });


  }
  profileImgChange() {
    this.el.nativeElement.click();
  }
}
