import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public blogs: any;
  menuPosition: any;
  sticky: boolean;
  elementPosition: any;
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  categories = [
    { src: '../../../assets/casual.png', name: 'CAREFREE CASUAL' },
    { src: '../../../assets/formal.png', name: 'FANTASTIC FORMAL' }
  ];
  selected = {
    src: '', name: ''
  }

  constructor(public router: Router, private route: ActivatedRoute, public blogServie: BlogService, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params.name === 'Casual') {
        this.selected = this.categories[0];
      } else if (params.name === 'Formal') {
        this.selected = this.categories[1];
      }
    });

    console.log(this.selected);

    this.route.data.subscribe(data => this.blogs = data);
    console.log(this.blogs);
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


