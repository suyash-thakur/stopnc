import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { BlogService } from '../services/blog.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewInit {
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  public blogs: any;
  menuPosition: any;
  sticky: boolean;
  elementPosition: any;
  hasNextpage: boolean;
  currentPage = 0;
  trendingBlogger = [];
  trendingProduct = [];
  isProductLoaded = false;

  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService, private http: HttpClient, public authService: AuthenticationService) {

    if (window.innerWidth  <= 991 ) {
      this.router.navigate(['mobile/feed']);
    }
   }

  blogBody = 'If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated. If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated'

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.blogs = data.blogs.docs;
      console.log(data);
      this.hasNextpage = data.blogs.hasNextPage;
      this.currentPage = this.currentPage + 1;
    });
    this.http.get('http://localhost:3000/api/admin/topBlog').subscribe((blog: any) => {
      this.trendingBlogger = blog;
      console.log(blog);
      console.log('HTTP Called');

    });
    this.http.get('http://localhost:3000/api/admin/trendingProduct').subscribe((product:any) => {
      console.log(product);
      this.trendingProduct = product;
      this.isProductLoaded = true;
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
    console.log("scroll");
    if (this.hasNextpage) {
      this.http.get('http://localhost:3000/api/blog/allBlog' + this.currentPage).subscribe((data: any) => {
        console.log(data);
        for (var i = 0; i < data.docs.length; i++) {
          this.blogs.push(data.docs[i]);
        }
        this.currentPage = this.currentPage + 1;
        this.hasNextpage = data.hasNextPage;
      });
    }

  }
  productClick(id) {
    var win = window.open(this.trendingProduct[id].link, '_blank');
    win.focus();
    this.http.put('http://localhost:3000/api/blog/blogClick/' + this.trendingProduct[id]._id, {}).subscribe(responce => {
      console.log(responce);
    });
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
