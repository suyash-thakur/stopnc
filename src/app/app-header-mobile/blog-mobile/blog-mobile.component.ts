import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-blog-mobile',
  templateUrl: './blog-mobile.component.html',
  styleUrls: ['./blog-mobile.component.css']
})
export class BlogMobileComponent implements OnInit {
  public currentSlide = 0;
  public slides = [
    {src : '../../../assets/Golbourne-1-1044x1566.jpg'},
    {src: '../../../assets/Uniqlo-x-J-W-Anderson-5-1044x1566.jpg'}
  ];
  id: number;
  isFocus: boolean;
  isLiked: boolean = false;
  likes: Array<any>;
  CommentInput: any;
  isBookmarked: any = false;
  bookmarkList = [];
  isFollowing: boolean = false;
  private sub: any;
  data: any;
  UserComment: any = [];
  isNextComment = true;
  commentPage = 1;
  blog: any;
  comment= 'I enjoyed this read, thank you for explaining so clearly. I would argue tho that the gig economy is not so different from the auto industry’s cycle of layoffs as supply and demand fluctuate. There is also evidence that building (buying) market share is a longterm strategy that yields intangable gains. Amazon took over a decade to turn a profit but what it earned in marketshare in that period is price.  ';
  ProfileImg: any;

  constructor(public blogservice: BlogService, public router: Router, private route: ActivatedRoute,
    private authService: AuthenticationService, private http: HttpClient, public userData: UserDataService) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.blog = data);
    this.slides = this.blog.blog.Blog.image;
    this.UserComment = this.blog.blog.Comment;
    this.likes = this.blog.blog.Blog.like;
    this.ProfileImg = this.userData.User.profileImage;
    if (this.blog.blog.Blog.authorId.follower.indexOf(this.authService.id) > -1) {
      this.isFollowing = true;
    }
    if (this.likes.indexOf(this.authService.id) > -1) {
      this.isLiked = true;
    }
    // console.log(this.authService.userdata);
    // if (this.authService.userdata.bookmarked.indexOf(this.blog.blog.Blog._id) > -1) {
    //   this.isBookmarked = true;
    //   console.log(this.isBookmarked);
    // }
    const data = {
      postId: this.blog.blog.Blog._id
    };
    this.http.get('http://localhost:3000/api/user/getBookmark' + this.authService.id).subscribe(res => {
      const data: any = res;

    this.bookmarkList = data.bookmark.bookmarked;
    if (this.bookmarkList.indexOf(this.blog.blog.Blog._id) > -1) {
      this.isBookmarked = true;
    } else {
      this.isBookmarked = false;
    }


    });
    this.userData.configObservable.subscribe(val => {
      this.ProfileImg = val.profileImage;

    });
    this.authService.userData.subscribe(val => {
      this.ProfileImg = val.profileImage;

    });
  }
  like(id) {
    console.log("Like");
    const data = {
      userId: this.authService.id,
      authId: this.blog.blog.Blog.authorId._id
    };
    this.http.put('http://localhost:3000/api/blog/like' + id, data).subscribe((res: Response) => {
        this.isLiked = !this.isLiked;
        this.likes.push(this.authService.id);

    });

  }
  bookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put('http://localhost:3000/api/user/bookmark' + this.authService.id, data).subscribe( res => {
      this.isBookmarked = true;
    });
  }
  removebookmark() {
    const data = {
      postId: this.blog.blog.Blog._id
    };

    this.http.put('http://localhost:3000/api/user/removebookmark' + this.authService.id, data).subscribe( res => {
      this.isBookmarked = false;
    });
  }
  unlike(id) {

    const data = {
      userId: this.authService.id
    };
    this.http.put('http://localhost:3000/api/user/unlike' + id, data).subscribe((res: Response) => {

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
    this.http.put('http://localhost:3000/api/blog/Commentlike' + id, Data).subscribe(responce => {
      console.log(responce);
    });

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
  getComment() {
    var blogId = this.blog.blog.Blog._id;
    this.http.get('http://localhost:3000/api/blog/comment/' + blogId + '/' + this.commentPage).subscribe((comment: any) => {
      console.log(comment.comment.docs);
      this.isNextComment = comment.comment.hasNextPage;

      if (comment.comment.docs.length > 0) {
        comment.comment.docs.forEach(comment => {
          this.UserComment.push(comment);
          this.commentPage = this.commentPage + 1;
        });
        console.log(comment.comment);

      }
    });
  }
}
