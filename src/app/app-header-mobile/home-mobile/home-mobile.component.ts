import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-mobile',
  templateUrl: './home-mobile.component.html',
  styleUrls: ['./home-mobile.component.css']
})
export class HomeMobileComponent implements OnInit {
  carno = [1, 2, 3, 4]
  blogBody = 'If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated. If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated'
  firstBlog: any;
  secondBlog: any;
  topBlogs: Array<any>;
  isFirstLoaded = false;
  exclusive = [];
  isLoading = false;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(environment.backendLink + 'api/admin/homepageInfo').subscribe((data: any) => {
      console.log(data);
      this.firstBlog = data.home.FirstBlog;
      this.secondBlog = data.home.SecondBlog;
      this.topBlogs = data.home.TopStories;
      this.isFirstLoaded = true;
    });
    this.http.get(environment.backendLink + 'api/admin/explore').subscribe((res: any) => {
      console.log(res);
      this.exclusive = res.explore.exclusive;

      this.isLoading = true;
    });
  }
  blogClick(id) {
    this.router.navigate(['/mobile/blog', id]);
  }
}
