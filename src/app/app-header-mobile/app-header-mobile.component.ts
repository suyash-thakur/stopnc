import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import {Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './app-header-mobile.component.html',
  styleUrls: ['./app-header-mobile.component.css']
})
export class AppHeaderMobileComponent implements OnInit {
  userLogin = false;
  authListenerSub: Subscription;
  currentRoute: Router;
  userId: string;
  User: User;
  Name = ' ';
  NOtification: Array<any>;
  profileImg = '';
  numberNot = 0;
  constructor(public authService: AuthenticationService, private router: Router, private http: HttpClient, public userData: UserDataService) {

    this.userLogin = this.authService.Userlogin;
  }
  reason = '';
  // Checks if Input Tag is in focus
  DisplayCategories = true;

  // Checks if Input tag is empty
  SearchInputEmpty = true;

  // Checks if Secondary Input is empty
  inputInSecondarySearch = false;

  // Checks if Secondary Input should be displayed

  displaySearchbar = false;

  @ViewChild('reference', { static: false }) nameField: ElementRef;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  // Put Input bar in focus when search field is erased
  inputFocus(): void {
    this.nameField.nativeElement.focus();
    this.SearchInputEmpty = true;
    this.inputInSecondarySearch = false;
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  onHide(val: boolean) {

    this.SearchInputEmpty = val;
    this.DisplayCategories = val;
    console.log('parent Component');
    console.log(this.DisplayCategories);
    console.log(this.SearchInputEmpty);




  }
  shiowContent(evet) {
    this.DisplayCategories = true;

  }
  allTrue(event) {
    this.SearchInputEmpty = true;

  }

  // Change value of DisplayCategories value to false when Input tag is in focus
  focusoutHandler(event) {
    this.DisplayCategories = false;
    console.log('Focus In');
    console.log('Display' + this.DisplayCategories);
  }

  // Change value of DisplayCategories value to true when Input tag is out of focus
  private focusinHandler(event) {
    this.DisplayCategories = true;
    console.log('Focus Out');
    console.log('Display' + this.DisplayCategories);
  }

  // Change the value of SearchInputEmpty to false when Input is typed and true When Input is reased
  onKey(event) {
    const inputValue = event.target.value;
    if (inputValue === '') {
      this.SearchInputEmpty = true;
      this.displaySearchbar = false;
      console.log('SearchInput' + this.SearchInputEmpty);

    } else {
      this.SearchInputEmpty = false;
      this.displaySearchbar = true;
      console.log('SearchInput' + this.SearchInputEmpty);
    }
  }
  // Change the value of variables when input is passed in second search bar
  onKeySecond(event) {
    const inputValue = event.target.value;
    if (inputValue === '') {
      this.SearchInputEmpty = true;
      this.inputInSecondarySearch = false;
      console.log('SearchInput' + this.SearchInputEmpty);
      console.log('secondarysearch' + this.inputInSecondarySearch);

    } else {
      this.inputInSecondarySearch = true;
      this.SearchInputEmpty = false;
      console.log('SearchInput' + this.SearchInputEmpty);
      console.log('secondarysearch' + this.inputInSecondarySearch);

    }
  }
  ngOnInit() {
    this.currentRoute = this.router;
    this.userLogin = this.authService.Userlogin;
    this.userId = this.authService.id;
    console.log(this.userId);

    if (this.userLogin) {
      this.http.get('http://localhost:3000/api/user/userInfo' + this.userId).subscribe((userData: any) => {
        let data = userData;
        console.log(data);
        this.authService.userdata = userData.User;
        this.User = {
          Name: userData.User.name,
          discription: userData.User.discription,
          about: userData.User.about,
          follower: userData.User.follower,
          following: userData.User.following,
          profileImage: userData.User.profileImage
        };
        this.profileImg = this.User.profileImage;
        this.userData.User = this.User;
        this.userData.emitConfig(this.User);
        console.log("emit info");
        this.Name = this.User.Name;
        this.NOtification = data.Notification;
        this.NOtification.forEach(n => {
          if (!n.isRead)
            this.numberNot = this.numberNot + 1;
        });
        console.log(this.numberNot);
      });







    }


  }
}



