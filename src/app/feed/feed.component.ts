import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
public blogs: any;
  constructor(public router: Router, public blogServie: BlogService) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/feed']);
    }
    this.blogServie.getBlogs();
   }

  blogBody = 'If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated. If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated'

  ngOnInit() {
    console.log(this.blogServie.selectBlog);
  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }

}
