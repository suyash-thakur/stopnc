import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(public authService: AuthenticationService, private http: HttpClient, public router: Router, public blogService: BlogService, private route: ActivatedRoute) {

    this.userId =  this.route.snapshot.paramMap.get('id');

    this.getComment(this.userId);

    this.http.get('http://localhost:3000/api/blog/userBlog' + this.userId).subscribe((userBlog: any) => {
      this.Blogs = userBlog.Blog;
      console.log(this.Blogs);
    });
    this.authService.userData.subscribe(user => {
      console.log(user);
      this.userBookmark = user.bookmarked;
    });
    console.log(this.userBookmark);

  }

  ngOnInit() {
    if (this.userId === this.authService.id) {
      this.isSameUser = true;
    }

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
