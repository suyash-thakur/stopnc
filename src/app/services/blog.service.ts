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
  getComment(userId: string) {
    throw new Error("Method not implemented.");
  }
  selectBlog: any;
  currentBlog: any;
  Useromment: any;

  constructor(private http: HttpClient,
              private router: Router, private userService: UserDataService, private authService: AuthenticationService) { }

   saveBlog(title: string, body: string, image: any[], tag: string) {
     const Blog: Blog = ({
       title: title,
       body: body,
       image: image,
       author: this.userService.User.Name,
       tag: tag,
       authorId: this.authService.id
     });

     this.http.post('http://localhost:3000/api/blog/createBlog', Blog).subscribe( responce => {
    console.log(responce);
    this.router.navigate(['/']);
      }
    );

  }
  saveDraft(title: string, body: string, image: any[], tag: string) {
    const Blog: Blog = ({
      title: title,
      body: body,
      image: image,
      author: this.userService.User.Name,
      tag: tag,
      authorId: this.authService.id
    });

    this.http.post('http://localhost:3000/api/blog/createDraft', Blog).subscribe(responce => {
      console.log(responce);
      this.router.navigate(['/draft']);
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
      postedBy: this.authService.id,

    };
    console.log(Comment);
    this.http.post('http://localhost:3000/api/blog/comment' + id, Comment).subscribe (
      responce => {
        console.log(responce);
        return responce;
      }
    );
  }


}

