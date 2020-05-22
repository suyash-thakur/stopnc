import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public currentSlide = 0;
  id: number;
  isFocus: boolean;
  CommentInput: any;
  private sub: any;
  data: any;
  UserComment: any = [];
  public slides = [

  ];
  blog: any;
  comment= 'I enjoyed this read, thank you for explaining so clearly. I would argue tho that the gig economy is not so different from the auto industry’s cycle of layoffs as supply and demand fluctuate. There is also evidence that building (buying) market share is a longterm strategy that yields intangable gains. Amazon took over a decade to turn a profit but what it earned in marketshare in that period is price.  ';
  constructor(public blogservice: BlogService, public router: Router, private route: ActivatedRoute) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/blog']);
    }
  //  this.route.data.subscribe(() => {

  //  })
   }

  ngOnInit() {
    this.route.data.subscribe(data => this.blog = data);
    this.slides = this.blog.blog.image;
    this.UserComment = this.blog.blog.comments;
    console.log(this.UserComment);
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
  onFocusOut() {
    if (this.CommentInput == null || this.CommentInput == '') {
      this.isFocus = false;
      const box = (<HTMLTextAreaElement>document.getElementById('inpC'));
      box.rows = 1;
    }
    console.log(this.CommentInput);
  }
}
