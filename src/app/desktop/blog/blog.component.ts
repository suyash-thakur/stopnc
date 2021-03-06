import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public currentSlide = 0;
  id: number;
  isFocus: boolean;
  isLiked = false;
  likes: Array<any>;
  CommentInput: any;
  isBookmarked: any = false;
  bookmarkList = [];
  isFollowing = false;
  private sub: any;
  data: any;
  UserComment: any = [];
  Products = [];
  recommendedBlog = [];
  recommendedUser = [];
  isRecLoad = false;
  isNextComment = true;
  isloggedin = false;
  commentPage = 1;
  show = true;
  public slides = [

  ];
  blog: any;
  constructor(public blogservice: BlogService, public router: Router, private route: ActivatedRoute,
    private authService: AuthenticationService, private http: HttpClient,) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/blog/' + route.snapshot.params.id]);
    }
  //  this.route.data.subscribe(() => {

  //  })
   }

  ngOnInit() {
    if (this.authService.id !== undefined) {
      this.isloggedin = true;
    }
    this.route.data.subscribe((data) => {
      this.blog = data;
      this.slides = this.blog.blog.Blog.image;
      this.UserComment = this.blog.blog.Comment;
      this.likes = this.blog.blog.Blog.like;
      this.Products = this.blog.blog.Blog.products;

    if (this.blog.blog.Blog.authorId.follower.indexOf(this.authService.id) > -1) {
      this.isFollowing = true;
    }
    if (this.likes.indexOf(this.authService.id) > -1) {
      this.isLiked = true;
    }

      if (this.authService.id !== undefined) {
        this.http.get(environment.backendLink + 'api/user/getBookmark' + this.authService.id).subscribe(res => {
          const data: any = res;

          this.bookmarkList = data.bookmark.bookmarked;
          if (this.bookmarkList.indexOf(this.blog.blog.Blog._id) > -1) {
            this.isBookmarked = true;
          } else {
            this.isBookmarked = false;
          }


        });
      }
      this.http.post(environment.backendLink + 'api/user/recommendation', { id: this.blog.blog.Blog._id }).subscribe((res: any) => {
        this.recommendedBlog = res.result;
        this.recommendedUser = res.userData;
        // console.log(this.recommendedBlog);
        if (this.recommendedUser.length > 2) {
          // // console.log('Recommendation', this.recommendedUser[0][0]);
        } else {
          this.show = false;
        }

        this.isRecLoad = true;


      });
    });
    // // console.log(this.blog);

    // // console.log(this.Products);

    // // console.log(this.authService.userdata);
    // if (this.authService.userdata.bookmarked.indexOf(this.blog.blog.Blog._id) > -1) {
    //   this.isBookmarked = true;
    //   // console.log(this.isBookmarked);
    // }

  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  checkIfImg(url) {
    const ext = url.split('.').pop();
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      return true;
    } else if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') {
      return false;
    } else {
      return undefined;
    }
  }
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }
  onFocus() {
    this.isFocus = true;
    const box = (document.getElementById('inpC') as HTMLTextAreaElement);
    box.rows = 5;
  }
  like(id) {
    // console.log('Like');
    const data = {
      userId: this.authService.id,
      authId: this.blog.blog.Blog.authorId._id
    };
    this.http.put(environment.backendLink + 'api/blog/like' + id, data).subscribe((res: Response) => {
        this.isLiked = !this.isLiked;
        this.likes.push(this.authService.id);

    });

  }
  bookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put(environment.backendLink + 'api/user/bookmark' + this.authService.id, data).subscribe(res => {
      this.isBookmarked = true;
    });
  }
  removebookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put(environment.backendLink + 'api/user/removebookmark' + this.authService.id, data).subscribe(res => {
      this.isBookmarked = false;
    });
  }
  unlike(id) {

    const data = {
      userId: this.authService.id
    };
    this.http.put(environment.backendLink + 'api/user/unlike' + id, data).subscribe((res: Response) => {

        this.isLiked = !this.isLiked;
        this.likes.splice(this.likes.indexOf(this.authService.id), 1);

    });
  }
  onFocusOut() {
    if (this.CommentInput == null || this.CommentInput === '') {
      this.isFocus = false;
      const box = (document.getElementById('inpC') as HTMLTextAreaElement);
      box.rows = 1;
    }
  }
  getComment() {
    const blogId = this.blog.blog.Blog._id;
    this.http.get(environment.backendLink + 'api/blog/comment/' + blogId + '/' + this.commentPage).subscribe((comment: any) => {
      // console.log(comment.comment.docs);
      this.isNextComment = comment.comment.hasNextPage;

      if (comment.comment.docs.length > 0) {
        comment.comment.docs.forEach(comment => {
          this.UserComment.push(comment);
          this.commentPage = this.commentPage + 1;
        });
        // console.log(comment.comment);

      }
    });
  }
  onComment() {
    const Comment = {
      body: this.CommentInput,
      postedBy: this.authService.id

    };
    // // console.log(Comment);
    this.http.post(environment.backendLink + 'api/blog/comment' + this.blog.blog.Blog._id, Comment).subscribe(
      (responce: any) => {
        // this.UserComment.push(res.);
        this.UserComment.push(responce.result);
        this.isFocus = false;
        this.CommentInput = null;
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
  onCommentLike(id, authorId) {
    const Data  = {
      authId: authorId,
      refId: this.blog.blog.Blog._id,
      userId: this.authService.id
    };
    this.http.put(environment.backendLink + 'api/blog/Commentlike' + id, Data).subscribe(responce => {
      // console.log(responce);
    });

  }
  onProductClicked(id) {
    this.http.put(environment.backendLink + 'api/blog/blogClick/' + id, {}).subscribe(responce => {
      // console.log(responce);
    });
  }
}
