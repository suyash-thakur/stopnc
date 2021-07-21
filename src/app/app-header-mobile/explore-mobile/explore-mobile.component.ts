import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-mobile',
  templateUrl: './explore-mobile.component.html',
  styleUrls: ['./explore-mobile.component.css']
})
export class ExploreMobileComponent implements OnInit {
  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
    { title: 'item 1' },

  ];
  isLoading = false;
  products = [];
  exclusive = [];
  trending = [];
  isTablet = false;
  constructor(private http: HttpClient, private router: Router) {
    if (window.innerWidth > 600) {
      this.isTablet = true;
    }
    this.http.get(environment.backendLink + 'api/admin/explore').subscribe((res: any) => {
      // console.log(res);
      this.products = res.explore.product;
      this.exclusive = res.explore.exclusive;
      this.trending = res.explore.trending;
      this.isLoading = true;
    });
  }

  ngOnInit() {
  }
  blogClick(id) {
    this.router.navigate(['/mobile/blog', id]);
  }
}
