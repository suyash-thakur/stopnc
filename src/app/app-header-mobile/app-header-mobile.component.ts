import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import {Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../services/user-data.service';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-mobile',
  templateUrl: './app-header-mobile.component.html',
  styleUrls: ['./app-header-mobile.component.css']
})
export class AppHeaderMobileComponent implements OnInit, AfterViewInit {
  userLogin = false;
  authListenerSub: Subscription;
  currentRoute: Router;
  userId: string;
  User: User;
  Name = ' ';
  NOtification: Array<any>;
  profileImg = '';
  numberNot = 0;
  userDataArray = [];
  userResult = [];
  following = [];
  page = 1;
  page2 = 1;
  blogResults = [];
  showResult = false;
  searchTearm: any;
  scrollMore = true;
  scrollMore2 = true;
  public keyUp = new Subject<string>();

  constructor(public authService: AuthenticationService, private router: Router, private http: HttpClient, public userData: UserDataService) {

    this.userLogin = this.authService.Userlogin;
    const subscription = this.keyUp.pipe(
      map((event:any) => (<HTMLInputElement>event.target).value),
      debounceTime(1000),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(500)))
    ).subscribe((data: any) => {
      console.log(data);
      if (data === "") {
        this.showResult = false;

      } else {
        this.searchTearm = data;
        this.showResult = true;
        this.http.get(environment.backendLink + 'api/user/searchBlog/' + data + '/' + 0).subscribe((res: any) => {
          console.log(res);
          this.blogResults = res.result.hits.hits;
          this.userDataArray = res.userData;

          this.scrollMore = true;
        });
        this.http.get(environment.backendLink + 'api/user/searchUser/' + data + '/' + 0).subscribe((res: any) => {
          this.userResult = res.result.hits.hits;
          console.log( this.userResult);

        });

      }

    });
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
    this.showResult = false;
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

      this.SearchInputEmpty = false;
      this.displaySearchbar = true;
      console.log('SearchInput' + this.SearchInputEmpty);
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
      this.http.get(environment.backendLink + 'api/user/userInfo' + this.userId).subscribe((userData: any) => {
        let data = userData;
        console.log(data);
        this.authService.emitConfig(userData.User);
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
        this.authService.notification = this.NOtification;
        this.NOtification.forEach(n => {
          if (!n.isRead)
            this.numberNot = this.numberNot + 1;
        });
        console.log(this.numberNot);
      });

      this.userData.configObservable.subscribe(val => {
        this.Name = val.Name;
        this.profileImg = val.profileImage;

      });





    }


  }
  ngAfterViewInit(): void {
    this.authService.setSidenav(this.sidenav);
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
  onScroll() {
    console.log("scroll");
    if (this.scrollMore2 === true) {
      this.http.get(environment.backendLink + 'api/user/searchUser/' + this.searchTearm + '/' + this.page2).subscribe((res: any) => {
        console.log(res);
        if (res.result.hits.hits.length !== 0) {
            this.blogResults.push(res.result.hits.hits);
          this.userDataArray.push(res.userData);
            this.page = this.page + 1;
          } else {
            this.scrollMore2 = false;
          }

          });
    }

  }

  onScroll2() {
    console.log("scroll");
    if (this.scrollMore2 === true) {
      this.http.get(environment.backendLink + 'api/user/searchBlog/' + this.searchTearm + '/' + this.page).subscribe((res: any) => {
        console.log(res);
        if (res.result.hits.hits.length !== 0) {
            this.userResult.push(res.result.hits.hits);
            this.page2 = this.page2 + 1;
          } else {
            this.scrollMore2 = false;
          }

          });
    }

  }
  onFollow(id) {
    this.authService.follow(id);
    this.following.push(id);
  }
  onUnFollow(id) {
    this.authService.unfollow(id);
    this.following.splice(id, 1);
  }
  isFollowing(id) : boolean {
    if (this.following.indexOf(id) > -1) {
      return true;
    } else {
      return false;
    }
  }
  blogClick(id) {
    this.router.navigate(['mobile/blog', id]);
    this.sidenav.close();

  }
  userClick(id) {
    this.router.navigate(['mobile/user', id]);
  }

}



