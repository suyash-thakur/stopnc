import { HttpClient } from '@angular/common/http';
import {  Component,  HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feed-mobile',
  templateUrl: './feed-mobile.component.html',
  styleUrls: ['./feed-mobile.component.css']
})
export class FeedMobileComponent implements OnInit {
  truncate = 200;
  public blogs: any;
  menuPosition: any;
  sticky: boolean;
  elementPosition: any;
  hasNextpage: boolean;
  currentPage = 0;

  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService, private http: HttpClient) {
    this.route.data.subscribe((data) => {
      this.blogs = data.blogs.docs;
      this.hasNextpage = data.blogs.hasNextPage;
      this.currentPage = this.currentPage + 1;
    });
    console.log(this.blogs);
   }

  ngOnInit() {
  }

  blogClick(id) {
    this.router.navigate(['mobile/blog', id]);
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
  onScroll() {
    console.log("scroll");
    if (this.hasNextpage) {
      this.http.get(environment.backendLink + 'api/blog/allBlog' + this.currentPage).subscribe((data: any) => {
        console.log(data);
        for (var i = 0; i < data.docs.length; i++) {
          this.blogs.push(data.docs[i]);
        }
        this.currentPage = this.currentPage + 1;
        this.hasNextpage = data.hasNextPage;
      });
    }

  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(event){
    console.log("scroll");
  }
}
