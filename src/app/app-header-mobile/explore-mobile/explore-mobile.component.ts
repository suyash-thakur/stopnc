import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/api/admin/explore').subscribe((res: any) => {
      console.log(res);
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
