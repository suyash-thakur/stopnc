import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-feed-mobile',
  templateUrl: './feed-mobile.component.html',
  styleUrls: ['./feed-mobile.component.css']
})
export class FeedMobileComponent implements OnInit, AfterViewInit {
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;
  truncate = 200;
  public blogs: any;
  menuPosition: any;
  sticky: boolean;
  elementPosition: any;
  blogBody = 'If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated. If you guys have been following me for a while, you know jeans are one of my favorite things to wear. I’m always on the search for the perfect-fitting pair of jeans, and I’ve got a few go-to trust-worthy brands. Additional Text to be truncated'

  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService) {
    this.route.data.subscribe(data => this.blogs = data);
    console.log(this.blogs);
   }

  ngOnInit() {
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
