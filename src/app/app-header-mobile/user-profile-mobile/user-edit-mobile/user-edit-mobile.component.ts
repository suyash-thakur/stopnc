import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-mobile',
  templateUrl: './user-edit-mobile.component.html',
  styleUrls: ['./user-edit-mobile.component.css']
})
export class UserEditMobileComponent implements OnInit {
  @ViewChild('imageInput', {static: true}) el:ElementRef;

  name: string;
  cridential: string;
  about: string;
  id: string;
  imageObj: any;

  profileImage = '';
  constructor(public User: UserDataService, public auth: AuthenticationService, private http: HttpClient, private router: Router) {
    this.name = this.User.User.Name;
    this.cridential = this.User.User.about;
    this.about = this.User.User.discription;
    this.profileImage = this.User.User.profileImage;
  }

  ngOnInit() {
    this.id = this.auth.id;

  }
  editUser() {
    const user = {
      id: this.auth.id,
      name: this.name,
      cridential: this.cridential,
      about: this.about
    };
    this.http.put('http://localhost:3000/api/user/userUpdate' + this.id, user).subscribe(response => {
      console.log(response);

      this.router.navigate(['/mobile/user']);

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
      this.profileImage = res.image;
      this.auth.user.profileImage = this.profileImage;
      this.User.emitConfig(this.auth.user);
      console.log(res.image);

    });
   }
}
