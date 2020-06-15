import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

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

  constructor(public authService: AuthenticationService, private http: HttpClient, public router: Router, public blogService: BlogService) {
    this.userId = this.authService.id;
    this.userBookmark = this.authService.userdata.bookmarked;
    console.log(this.userBookmark);

    this.getComment(this.userId);


  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/blog/userBlog' + this.userId).subscribe((userBlog: any) => {
      this.Blogs = userBlog.Blog;
      console.log(this.Blogs);
    });
  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  getComment(id) {
    console.log(id);
    this.http.get('http://localhost:3000/api/user/commentUser' + id).subscribe((comment: any) => {
      this.Useromment = comment.comment;
      console.log(this.Useromment);
  });
  }
}
