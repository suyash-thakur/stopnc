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
  imageObj: any;
  followerNo: any = [];
  followingNo: any = [];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(public User: UserDataService, public auth: AuthenticationService, private http: HttpClient, private router: Router) {

   }

  ngOnInit() {
    this.name = this.auth.user.name;
    this.cridential = this.auth.user.discription;
    this.about = this.auth.user.about;
    this.profileImg = this.auth.user.profileImage;
    this.followerNo = this.auth.user.follower;
    this.followingNo = this.auth.user.following;
    console.log(this.auth.user);

    this.auth.userData.subscribe(val => {
      this.name = val.name;
      this.cridential = val.discription;
      this.about = val.about;
      this.profileImg = val.profileImage;
      this.followerNo = val.follower.length;
    this.followingNo = val.following.length;
      console.log( val.follower);
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
  onImagePicked(event: Event): void {
    console.log('clicked');
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
    this.onImageUpload();
   }

  onImageUpload() {
    const imageForm = new FormData();
    console.log('clicked 2');

    imageForm.append('image', this.imageObj);
    this.auth.imageUpload(imageForm).subscribe((res:any) => {
      this.profileImg = res.image;
      this.User.User.profileImage = this.profileImg;
      this.User.emitConfig(this.User.User);
      console.log(res.image);

    });
   }
}
