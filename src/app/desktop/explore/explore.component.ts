import { HttpClient } from '@angular/common/http';
import { AfterViewInit, HostListener } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit , AfterViewInit{
  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
    { title: 'item 1' },

  ];
  sticky: boolean;
  elementPosition: any;
  isLoading = false;
  products = [];
  exclusive = [];
  trending = [];
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(environment.backendLink + 'api/admin/explore').subscribe((res: any) => {
      // console.log(res);
      this.products = res.explore.product;
      this.exclusive = res.explore.exclusive;
      this.trending = res.explore.trending;
      this.isLoading = true;
    });

  }
  blogClick(id) {
    this.router.navigate(['/blog', id]);
  }
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;

      } else {
          this.sticky = false;
      }
  }
}
