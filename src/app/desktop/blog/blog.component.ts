import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public currentSlide = 0;
  id: number;
  isFocus: boolean;
  isLiked: boolean = false;
  likes: Array<any>;
  CommentInput: any;
  isBookmarked: any = false;
  isFollowing: boolean = false;
  private sub: any;
  data: any;
  UserComment: any;
  public slides = [

  ];
  blog: any;
  constructor(public blogservice: BlogService, public router: Router, private route: ActivatedRoute,
    private authService: AuthenticationService, private http: HttpClient,) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/blog']);
    }
  //  this.route.data.subscribe(() => {

  //  })
   }

  ngOnInit() {
    this.route.data.subscribe(data => this.blog = data);
    this.slides = this.blog.blog.Blog.image;
    this.UserComment = this.blog.blog.Comment;
    this.likes = this.blog.blog.Blog.like;
    console.log();
    if (this.blog.blog.Blog.authorId.follower.indexOf(this.authService.id) > -1) {
      this.isFollowing = true;
      console.log(this.isFollowing);
    }
    if(this.likes.indexOf(this.authService.id) > -1) {
      this.isLiked = true;
    }
    console.log(this.authService.userdata);
    if(this.authService.userdata.bookmarked.indexOf(this.blog.blog.Blog._id) > -1) {
      this.isBookmarked = true;
    }

  }
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }
  onFocus() {
    this.isFocus = true;
    const box = (<HTMLTextAreaElement>document.getElementById('inpC'));
    box.rows = 10;
    console.log(this.isFocus);
  }
  like(id) {
    console.log("Like");
    console.log(id);
    const data = {
      userId: this.authService.id,
      authId: this.blog.blog.Blog.authorId._id
    };
    this.http.put('http://localhost:3000/api/blog/like' + id, data).subscribe((res: Response) => {
      console.log(res);
        this.isLiked = !this.isLiked;
        this.likes.push(this.authService.id);

    });

  }
  bookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put('http://localhost:3000/api/user/bookmark' + this.authService.id, data).subscribe( res => {
      console.log(res);
      this.isBookmarked = true;
    });
  }
  removebookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put('http://localhost:3000/api/user/removebookmark' + this.authService.id, data).subscribe( res => {
      console.log(res);
      this.isBookmarked = false;
    });
  }
  unlike(id) {

    const data = {
      userId: this.authService.id
    };
    this.http.put('http://localhost:3000/api/user/unlike' + id, data).subscribe((res: Response) => {
      console.log(res);

        this.isLiked = !this.isLiked;
        this.likes.splice(this.likes.indexOf(this.authService.id), 1);

    });
  }
  onFocusOut() {
    if (this.CommentInput == null || this.CommentInput == '') {
      this.isFocus = false;
      const box = (<HTMLTextAreaElement>document.getElementById('inpC'));
      box.rows = 1;
    }
    console.log(this.CommentInput);
  }
  onComment() {
    const Comment = {
      body: this.CommentInput,
      postedBy: this.authService.id

    };
    console.log(Comment);
    this.http.post('http://localhost:3000/api/blog/comment' + this.blog.blog.Blog._id, Comment).subscribe (
      responce => {
        console.log(responce);
        // this.UserComment.push(res.);
        this.http.get('http://localhost:3000/api/blog/comment' + this.blog.blog.Blog._id).subscribe(
          responce => {
            var com: any = responce;
            this.isFocus = false;
            this.UserComment = com.comment;
            console.log(this.UserComment);
            const box = (<HTMLTextAreaElement>document.getElementById('inpC'));
            box.rows = 1;
            this.CommentInput = null;
          }
        );
      }
    );
  }
  onFollow() {
    this.isFollowing = true;
    this.authService.follow(this.blog.blog.Blog.authorId._id);
  }
  onUnFollow() {
    this.isFollowing = false;
    this.authService.unfollow(this.blog.blog.Blog.authorId._id);
  }
}
