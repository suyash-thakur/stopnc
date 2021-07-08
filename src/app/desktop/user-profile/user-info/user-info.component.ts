import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId: string;
  Blogs: Array<any> = [];
  comment: any;
  Useromment: Array<any> = [];
  userBookmark: any;
  isSameUser = false;
  screensize = 0;
  videoHeigh = 0;
  constructor(public authService: AuthenticationService, private http: HttpClient, public router: Router, public blogService: BlogService, private route: ActivatedRoute) {


    if (window.innerWidth > 1500) {

    }


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId === this.authService.id) {
        this.isSameUser = true;
        this.userBookmark = this.authService.user.bookmarked;

      }
      this.getComment(this.userId);
      this.screensize = window.innerWidth;
      this.http.get(environment.backendLink + 'api/blog/userBlog' + this.userId).subscribe((userBlog: any) => {
        this.Blogs = userBlog.Blog;
        // console.log(this.Blogs);
      });
      this.authService.userData.subscribe(user => {
        // console.log(user);
        this.userBookmark = user.bookmarked;
        // console.log("Bookmarks", this.userBookmark);

      });
    });


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
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  blogClickEdit(id) {
    this.router.navigate(['/create', id]);
  }
  getComment(id) {
    // console.log(id);
    this.http.get(environment.backendLink + 'api/user/commentUser' + id).subscribe((comment: any) => {
      this.Useromment = comment.comment;
      // console.log(this.Useromment);
  });
  }
}
