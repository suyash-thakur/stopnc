import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId: string;
  Blogs: Array<any>;

  constructor(public authService: AuthenticationService, private http: HttpClient, public router: Router) {
    this.userId = this.authService.id;
    console.log(this.userId);
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
}
