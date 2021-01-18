import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  User: User;
  name: string;
  Blogs: Array<any> = [];
  comment: any;
  Useromment: Array<any> = [];
  userBookmark: any = [];
  userId: any;

  constructor(public userData: UserDataService, private http: HttpClient, public router: Router, public blogService: BlogService, public authService: AuthenticationService) {
    this.userId = this.authService.id;
    console.log(this.userBookmark);

    this.getComment(this.userId);
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/blog/userBlog' + this.userId).subscribe((userBlog: any) => {
      this.Blogs = userBlog.Blog;
      console.log(this.Blogs);
    });
    this.userBookmark = this.authService.userdata.bookmarked;

  }
  getComment(id) {
    console.log(id);
    this.http.get('http://localhost:3000/api/user/commentUser' + id).subscribe((comment: any) => {
      this.Useromment = comment.comment;
      console.log(this.Useromment);
  });
  }

  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  }


