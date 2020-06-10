import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VirtualTimeScheduler, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserDataService } from './user-data.service';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  selectBlog: any;
  currentBlog: any;
  Useromment: any;

  constructor(private http: HttpClient,
              private router: Router, private userService: UserDataService, private authService: AuthenticationService) { }

   saveBlog(title: string, body: string, image: any[]) {
     const Blog: Blog = ({
       title: title,
       body: body,
       image: image,
       author: this.userService.User.Name,
       authorId: this.authService.id
     });

     console.log(Blog);
     this.http.post('http://localhost:3000/api/blog/createBlog', Blog).subscribe(
    responce => {
    console.log(responce);
    this.router.navigate(['/']);
      }
    );

  }
  getBlogs() {
    this.http.get('http://localhost:3000/api/blog/allBlog').subscribe (
      responce => {
        this.selectBlog = responce;
        console.log(this.selectBlog);

      }
    );
  }

  getOneBlog( id: any) {
    this.http.get('http://localhost:3000/api/blog/blogs' +  id).subscribe (
      responce => {
        this.currentBlog = responce;
        return responce;

      }
    );
  }
  comment(body, id) {
    const Comment = {
      body: body,
      postedBy: this.authService.id

    };
    console.log(Comment);
    this.http.post('http://localhost:3000/api/blog/comment' + id, Comment).subscribe (
      responce => {
        console.log(responce);
        return responce;
      }
    );
  }

  getComment(id) {
    console.log(id);
    this.http.get('http://localhost:3000/api/user/commentUser' + id).subscribe(comment => {
      this.Useromment = comment;
      console.log(this.Useromment);
  });
  }
}

