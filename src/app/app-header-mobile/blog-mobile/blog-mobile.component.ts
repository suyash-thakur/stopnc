import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-mobile',
  templateUrl: './blog-mobile.component.html',
  styleUrls: ['./blog-mobile.component.css']
})
export class BlogMobileComponent implements OnInit, OnDestroy {
  public currentSlide = 0;
  public slides = [
    {src : '../../../assets/Golbourne-1-1044x1566.jpg'},
    {src: '../../../assets/Uniqlo-x-J-W-Anderson-5-1044x1566.jpg'}
  ];
  id: number;
  isFocus: boolean;
  isLiked = false;
  likes: Array<any>;
  CommentInput: any;
  isBookmarked: any = false;
  bookmarkList = [];
  isFollowing = false;
  private sub: any;
  recommendedBlog = [];
  recommendedUser = [];
  isRecLoad = false;
  data: any;
  UserComment: any = [];
  Products = [];

  isNextComment = true;
  isLoading = false;
  commentPage = 1;
  isloggedin = false;
  isTablet = false;
  blog: any;
  // tslint:disable-next-line: max-line-length
  comment = 'I enjoyed this read, thank you for explaining so clearly. I would argue tho that the gig economy is not so different from the auto industry’s cycle of layoffs as supply and demand fluctuate. There is also evidence that building (buying) market share is a longterm strategy that yields intangable gains. Amazon took over a decade to turn a profit but what it earned in marketshare in that period is price.  ';
  ProfileImg: any;

  constructor(public blogservice: BlogService, public router: Router, private route: ActivatedRoute,
    // tslint:disable-next-line: align
    private authService: AuthenticationService, private http: HttpClient, public userData: UserDataService) {
    if (window.innerWidth > 991) {
      this.router.navigate(['blog/' + route.snapshot.params.id]);
    }
    if (window.innerWidth > 600) {
      this.isTablet = true;
    }
  }

  ngOnInit() {
    if (this.authService.id !== undefined) {
      this.isloggedin = true;
    }
    this.route.data.subscribe((data) => {
      this.isRecLoad = false;


      this.blog = data;
      this.slides = this.blog.blog.Blog.image;
      this.UserComment = this.blog.blog.Comment;
      this.likes = this.blog.blog.Blog.like;
      this.Products = this.blog.blog.Blog.products;
      this.userData.configObservable.subscribe(val => {
        this.ProfileImg = val.profileImage;

      });
      this.authService.userData.subscribe(val => {
        this.ProfileImg = val.profileImage;

      });
      if (this.blog.blog.Blog.authorId.follower.indexOf(this.authService.id) > -1) {
        this.isFollowing = true;
      }
      if (this.likes.indexOf(this.authService.id) > -1) {
        this.isLiked = true;
      }
      // // console.log(this.authService.userdata);
      // if (this.authService.userdata.bookmarked.indexOf(this.blog.blog.Blog._id) > -1) {
      //   this.isBookmarked = true;
      //   // console.log(this.isBookmarked);
      // }

      if (this.authService.id !== undefined) {
        this.ProfileImg = this.userData.User.profileImage;

        this.http.get(environment.backendLink + 'api/user/getBookmark' + this.authService.id).subscribe(res => {
          // tslint:disable-next-line: no-shadowed-variable
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
        // // console.log('Recommendation', this.recommendedUser[0][0]);

        this.isRecLoad = true;


      });
      this.isLoading = true;

    });

  }
  ngOnDestroy() {
    this.isRecLoad = false;
    this.isLoading = false;
  }
  like(id) {
    // // console.log("Like");
    const data = {
      userId: this.authService.id,
      authId: this.blog.blog.Blog.authorId._id
    };
    this.http.put(environment.backendLink + 'api/blog/like' + id, data).subscribe((res: Response) => {
        this.isLiked = !this.isLiked;
        this.likes.push(this.authService.id);

    });

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
      // // console.log(responce);
    });

  }
  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    // // console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    // // console.log("next clicked, new current slide is: ", this.currentSlide);
  }
  getComment() {
    const blogId = this.blog.blog.Blog._id;
    this.http.get(environment.backendLink + 'api/blog/comment/' + blogId + '/' + this.commentPage).subscribe((comment: any) => {
      // console.log(comment.comment.docs);
      this.isNextComment = comment.comment.hasNextPage;

      if (comment.comment.docs.length > 0) {
        // tslint:disable-next-line: no-shadowed-variable
        comment.comment.docs.forEach(comment => {
          this.UserComment.push(comment);
          this.commentPage = this.commentPage + 1;
        });
        // console.log(comment.comment);

      }
    });
  }
  onFocus() {
    this.isFocus = true;
    // console.log('focus');
    const box = (document.getElementById('inpC') as HTMLTextAreaElement);
    box.rows = 5;
  }

  blogClick(id) {
    this.router.navigate(['mobile/blog', id]);
  }
  onFocusOut() {
    if (this.CommentInput == null || this.CommentInput === '') {
      this.isFocus = false;
      const box = (document.getElementById('inpC') as HTMLTextAreaElement);
      box.rows = 2;
    }
  }
  onProductClicked(id) {
    this.http.put(environment.backendLink + 'api/blog/blogClick/' + id, {}).subscribe(responce => {
      // console.log(responce);
    });
  }
  onComment() {
    const Comment = {
      body: this.CommentInput,
      postedBy: this.authService.id

    };
    // console.log(Comment);
    this.http.post(environment.backendLink + 'api/blog/comment' + this.blog.blog.Blog._id, Comment).subscribe(
      (responce: any) => {
        // this.UserComment.push(res.);
        this.UserComment.push(responce.result);
        this.isFocus = false;
        this.CommentInput = null;
      }
    );
  }

}
