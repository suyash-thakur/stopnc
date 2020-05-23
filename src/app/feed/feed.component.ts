import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
public blogs: any;
  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/feed']);
    }
   }

  blogBody = 'If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated. If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated'

  ngOnInit() {
    this.route.data.subscribe(data => this.blogs = data);
    console.log(this.blogs);
  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }

}
