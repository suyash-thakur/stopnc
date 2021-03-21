import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: any;
  blogResults = [];
  userData = [];
  page = 1;
  scrollMore = true;

  constructor(public router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.search = params.query;
      this.http.get('http://localhost:3000/api/user/searchBlog/' + this.search + '/' + 0).subscribe((res: any) => {
        console.log(res);
        this.blogResults = res.result.hits.hits;
        this.userData = res.userData;
        this.scrollMore = true;
      });
    });

  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
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
    if (this.scrollMore === true) {
      this.http.get('http://localhost:3000/api/user/searchBlog/' + this.search + '/' + this.page).subscribe((res: any) => {
        console.log(res);
        if (res.result.hits.hits.length !== 0) {
            this.blogResults.push(res.result.hits.hits);
            this.userData.push(res.userData);
            this.page = this.page + 1;
          } else {
            this.scrollMore = false;
          }

          });
    }

    }


}
