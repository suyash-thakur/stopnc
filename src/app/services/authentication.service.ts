import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../models/auth-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private sidenav: MatSidenav;

  user: any;
  id: string;
  Userlogin: boolean;
  private tokenTimer: any;
  timer: any;
  userdata: any;
  follower: any;
  following: any;
  notification: Array<any>;
  wrongCred = false;
  emailExist = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  public userData = new Subject<any>();

  emitConfig(userData) {
    this.user = userData;
    this.userData.next(userData);
  }

  constructor(private http: HttpClient, private router: Router) { }

  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, name: string): Promise<any> {
    return Promise.resolve((() => {
      // code here
      const authData: AuthData = {email, password, name };
      this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe((response:any) => {
      console.log(response);
      localStorage.setItem('isVerfied', 'false');
      localStorage.setItem('emailVerify', response.result.email);
      localStorage.setItem('idVerify', response.result._id);
      this.router.navigate(['/emailVerification']);
      return 'from first'; // return whatever you want not neccessory
    });
  })());
}

login(email: string, password: string): Promise<any> {

    return Promise.resolve((() => {
      // code here
      const authData = {email, password};
      this.http.post<{token: string; expiresIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);

        const token = response.token;
        this.token = token;
        console.log(this.token);
        this.authStatusListener.next(true);
        this.user = helper.decodeToken(token);
        this.saveAuthData(token, this.user.exp);

        console.log(this.user.exp);
        this.id = this.user.userId;
        this.wrongCred = false;
        console.log(this.user);
        console.log(this.id);

      });
      return 'from second'; // return whatever you want not neccessory
  })());
}



  verifyEmail(userId, token) {
    return Promise.resolve((() => {
      this.http.put('http://localhost:3000/api/user/verifyEmail/' + userId + '/' + token, {}).subscribe((response: any) => {
        console.log(response);
        if (response.message === 'Token Verified') {
          const token = response.token;
          this.token = token;
          localStorage.setItem('isVerfied', 'true');
          console.log(this.token);
          this.authStatusListener.next(true);
          this.user = helper.decodeToken(token);
          this.saveAuthData(token, this.user.exp);
          this.Userlogin = true;
          console.log(this.user.exp);
          this.id = this.user.userId;
          this.wrongCred = false;
          console.log(this.user);
          console.log(this.id);
          this.router.navigate(['/']);
        }
      });
    })());


  }

logout() {
  this.token = null;
  this.Userlogin = false;
  this.authStatusListener.next(false);
  this.clearAuthData();
  console.log('logout');
  this.router.navigate(['/login']);
}


private saveAuthData(token: string, expiration: string ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration);

}

private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');


}


private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      console.log('error!');

      return;
    }
    return {
      token,
      expirationDate


    };
}


autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      console.log('error');

      return;
    }
    const now = new Date();
    const datenow = now.getTime();
    const date = Number(authInformation.expirationDate) * 1000;
    const expiresIn = date - now.getTime();
    console.log(date);
    console.log(datenow);


    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.Userlogin = true;
      this.user = helper.decodeToken(this.token);
      this.id = this.user.userId;

      this.authStatusListener.next(true);
      console.log(this.id);
    } else {
      console.log('error');
      this.authStatusListener.next(false);

    }
}
getUser(id: string) {
  return this.http.get<{
    _id: string;
    name: string;
    discription: string;
    about: string;
    follower: any;
    following: any;

  }>('http://localhost:3000/api/user/userInfo' + id);
}


getToken() {
  return this.token;
}

 googleLogin( id: string, email: string, name: string ) {

  this.http.post('http://localhost:3000/api/user/socialAuth', {email:email, password: id, name: name}).subscribe((data:any) => {
    console.log(data);
    const token = data.token;
    this.token = token;
    console.log(this.token);
    this.authStatusListener.next(true);
    this.Userlogin = true;
    this.user = helper.decodeToken(token);
    this.saveAuthData(token, this.user.exp);

    console.log(this.user.exp);
    this.id = this.user.userId;
    console.log(this.user);
    console.log(this.id);
    this.router.navigate(['/']);
  });

}

follow(followerId) {
  const Id = {
    followerId: this.id
  };
  console.log(followerId);
  console.log(Id);
  this.http.put('http://localhost:3000/api/user/follow' + followerId, Id).subscribe (responce => {
    console.log(responce);
  });
}
unfollow(followerId) {
  const Id = {
    followerId: this.id
  };
  console.log(followerId);
  console.log(Id);
  this.http.put('http://localhost:3000/api/user/unfollow' + followerId, Id).subscribe (responce => {
    console.log(responce);
  });
}
imageUpload(imageForm: FormData) {
  console.log('image uploading');
  return this.http.post('http://localhost:3000/api/user/uploadProfileImage' + this.id, imageForm);
}
public setSidenav(sidenav: MatSidenav) {
  this.sidenav = sidenav;
}

public open() {
  return this.sidenav.open();
}


public close() {
  return this.sidenav.close();
}

public toggle(): void {
this.sidenav.toggle();
}

}
