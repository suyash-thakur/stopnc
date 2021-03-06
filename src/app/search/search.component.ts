import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: any;
  blogResults = [];
  userData = [];
  userResult = [];
  following = [];
  page = 1;
  scrollMore = true;

  constructor(public router: Router, private route: ActivatedRoute, private http: HttpClient,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.search = params.query;
      this.http.get(environment.backendLink + 'api/user/searchBlog/' + this.search + '/' + 0).subscribe((res: any) => {
        // console.log(res);
        this.blogResults = res.result;
        this.userData = res.userData;
        this.scrollMore = true;
      });
      this.http.get(environment.backendLink + 'api/user/searchUser/' + this.search + '/' + 0).subscribe((res: any) => {
        // console.log(res);
      this.userResult = res.result;
      });
    });

    this.authService.userData.subscribe(data => {
      this.following = data.following;
    });

  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  userClick(id) {
    this.router.navigate(['/user', id]);
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
    // console.log("scroll");
    if (this.scrollMore === true) {
      this.http.get(environment.backendLink + 'api/user/searchBlog/' + this.search + '/' + this.page).subscribe((res: any) => {
        // console.log(res);
        if (res.result.length !== 0) {
            this.blogResults.push(res.result);
            this.userData.push(res.userData);
            this.page = this.page + 1;
          } else {
            this.scrollMore = false;
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

}
