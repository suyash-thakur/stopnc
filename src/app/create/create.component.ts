import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css',
  ],
  animations: [
    trigger('buttonState', [
      state('plus', style({
        transform: 'rotate(0deg)'
       })),
      state('cross', style({
        transform: 'rotate(45deg)'
       })),
      transition('plus => cross', animate('100ms ease-in')),
      transition('cross => plus', animate('100ms ease-out'))
    ]
    ),
    trigger('buttonSubState', [
      state('plus', style({
        display: 'none',
        opacity: 0,
        top: '100px'

       })),
      state('cross', style({
        display: 'inherit',
        opacity: 1,
        top: '160px'

       })),
      transition('plus => cross', animate('100ms ease-out')),
      transition('cross => plus', animate('100ms ease-in'))
    ]
    ),
    trigger('buttonSubState2', [
      state('plus', style({
        display: 'none',
        opacity: 0,
        top: '100px'

       })),
      state('cross', style({
        display: 'inherit',
        opacity: 1,
        top: '220px'

       })),
      transition('plus => cross', animate('100ms ease-out')),
      transition('cross => plus', animate('100ms ease-in'))
    ]
    ),
  ]
})
export class CreateComponent implements OnInit {
  state: String = 'plus';
  public imagesUrl = [];

  public url;
  public title: string;
  public body: string;
  blog: Blog;
  imgObj: any;

  constructor(private blogservice: BlogService, private http: HttpClient) { }

  ngOnInit() {
  }

  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        const FILE = event.target.files[0];
        this.imgObj = FILE;
        this.onImageUpload();

      }
  }
  onImageUpload() {
    const imageForm = new FormData();
    console.log('clicked 2');

    imageForm.append('image', this.imgObj);
    this.http.post('http://localhost:3000/api/blog/uploadBlogImage', imageForm).subscribe((val: any) => {
      let link = val.image;
      this.imagesUrl.push(link);
      console.log(link);
    });

   }
  onSubmit() {
    // console.log(this.body);
    // console.log(this.title);
    // console.log(this.imagesUrl);


    this.blogservice.saveBlog(this.title, this.body, this.imagesUrl);
  }
  onRemovePicture(i) {
    let key = this.imagesUrl[i];
    key = 'blogImage/' + key.split('/').pop();
    console.log(key);
    this.http.post('http://localhost:3000/api/blog/removeBlogImage', { key: key }).subscribe((val) => {
      this.imagesUrl.splice(i, 1);
    });
  }
  toggleState() {
    this.state = this.state === 'plus' ? 'cross' : 'plus';
  }
}
