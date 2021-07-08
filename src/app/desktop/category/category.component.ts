import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public blogs: any = [];
  menuPosition: any;
  sticky: boolean;
  hasNextpage: boolean;
  currentPage = 0;
  elementPosition: any;
  trending = [];
  isLoading = false;

  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  categories = [
    { src: '../../../assets/casual.png', name: 'CAREFREE CASUAL' },
    { src: '../../../assets/formal.png', name: 'FANTASTIC FORMAL' },
    { src: '../../../assets/date.png', name: 'DAZZLING DATE' },
    { src: '../../../assets/sports.png', name: 'SASSY SPORTS' },
    { src: '../../../assets/outdoor.png', name: 'OUTSTANDING OUTDOORS' },
    { src: '../../../assets/clubbing.png', name: 'CANDID CLUBBING' },
    { src: '../../../assets/travel.png', name: 'TERRIFIC TRAVEL' },
    { src: '../../../assets/accessories.png', name: 'ACCESSORIES' }
  ];
  selected = {
    src: '', name: ''
  }
  params: any;
  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // console.log(params);
      this.params = params.name;
      if (params.name === 'Casual') {
        this.selected = this.categories[0];
      } else if (params.name === 'Formal') {
        this.selected = this.categories[1];
      } else if (params.name === 'Date') {
        this.selected = this.categories[2];
      } else if (params.name === 'Sports') {
        this.selected = this.categories[3];
      } else if (params.name === 'Outdoor') {
        this.selected = this.categories[4];
      } else if (params.name === 'Clubbing') {
        this.selected = this.categories[5];
      } else if (params.name === 'Travel') {
        this.selected = this.categories[6];
      }else if (params.name === 'Accessories') {
        this.selected = this.categories[7];
      }
    });

    // console.log(this.selected);

    this.route.data.subscribe(data => this.blogs = data);
    // console.log(this.blogs);
    this.http.get(environment.backendLink + 'api/admin/explore').subscribe((res: any) => {
      // console.log(res);

      this.trending = res.explore.trending;
      this.isLoading = true;

    });
  }
  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
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
    // console.log("scroll");
    if (this.hasNextpage) {
      this.http.get(environment.backendLink + 'api/blog/categories/' + this.params + '/' + this.currentPage).subscribe((data: any) => {
        // console.log(data);
        for (var i = 0; i < data.docs.length; i++) {
          this.blogs.push(data.docs[i]);
        }
        this.currentPage = this.currentPage + 1;
        this.hasNextpage = data.hasNextPage;
      });
    }

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


