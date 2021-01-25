import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css',
]
})
export class CreateComponent implements OnInit {

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

}
