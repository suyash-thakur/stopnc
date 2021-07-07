import { Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VirtualTimeScheduler, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserDataService } from './user-data.service';
import { environment } from '../../environments/environment';


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

     this.http.post(environment.backendLink + 'api/blog/createBlog', Blog).subscribe(responce => {
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

    this.http.post(environment.backendLink + 'api/blog/createDraft', Blog).subscribe(responce => {
      console.log(responce);
      this.router.navigate(['/draft']);
    }
    );

  }
  publishDraft(id, title: string, body: string, image: any[], tag: string) {
    const Blog: Blog = ({
      title: title,
      body: body,
      image: image,
      author: this.userService.User.Name,
      tag: tag,
      authorId: this.authService.id
    });
    this.http.put(environment.backendLink + 'api/blog/draftPublish/' + id, Blog).subscribe(response => {
      console.log(response);
      this.router.navigate(['/draft']);
    });
  }

  updateDraft(id, title: string, body: string, image: any[], tag: string) {
    const Blog: Blog = ({
      title: title,
      body: body,
      image: image,
      author: this.userService.User.Name,
      tag: tag,
      authorId: this.authService.id
    });
    this.http.put(environment.backendLink + 'api/blog/updateDraft/' + id, Blog).subscribe(response => {
      console.log(response);
      this.router.navigate(['/draft']);
    });
  }

  getBlogs() {
    this.http.get(environment.backendLink + 'api/blog/allBlog').subscribe(
      responce => {
        this.selectBlog = responce;
        console.log(this.selectBlog);

      }
    );
  }

  getOneBlog( id: any) {
    this.http.get(environment.backendLink + 'api/blog/blogs' + id).subscribe(
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
    this.http.post(environment.backendLink + 'api/blog/comment' + id, Comment).subscribe(
      responce => {
        console.log(responce);
        return responce;
      }
    );
  }


}

