import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

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
  isSameUser: boolean;
  isloading = true;

  constructor(public userData: UserDataService, private http: HttpClient, public router: Router, private route: ActivatedRoute, public blogService: BlogService, public authService: AuthenticationService) {
    this.userId =  this.route.snapshot.paramMap.get('id');

    this.getComment(this.userId);
  }

  ngOnInit() {
    if (this.userId === this.authService.id) {
      this.isSameUser = true;
    }
    this.http.get(environment.backendLink + 'api/blog/userBlog' + this.userId).subscribe((userBlog: any) => {
      this.Blogs = userBlog.Blog;
      console.log(this.Blogs);
      this.isloading = false;

    });
    this.authService.userData.subscribe(user => {
      console.log(user);
      this.userBookmark = user.bookmarked;
    });
    console.log("Bookmarks", this.userBookmark);


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
  getComment(id) {
    console.log(id);
    this.http.get(environment.backendLink + 'api/user/commentUser' + id).subscribe((comment: any) => {
      this.Useromment = comment.comment;
      console.log(this.Useromment);
  });
  }

  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  }


