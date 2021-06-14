import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  message: 'Blog must have at least 60 words' | 'Blog must have at least 2 images' | 'Blog header must have at least 3 words' | 'Blog must have a category';
}
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
export class CreateComponent implements OnInit, OnDestroy {
  state: String = 'plus';
  public imagesUrl = [];
  isWordShort = false;
  public url;
  public title: string;
  public body: string;
  blog: Blog;
  imgObj: any;
  id: string;
  isDraft = false;
  isPrevious = false;
  prevSelected: number;
  public categories = [
    { name: 'Casual', clicked: false },
    { name: 'Formal', clicked: false },
    { name: 'Date', clicked: false },
    { name: 'Sports', clicked: false },
    { name: 'Outdoor', clicked: false },
    { name: 'Clubbing', clicked: false },
    { name: 'Travel', clicked: false },
    { name: 'Accessories', clicked: false }
  ]

  constructor(private blogservice: BlogService, private http: HttpClient, public dialog: MatDialog, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);
      if (data.id !== undefined) {
        this.http.get('http://localhost:3000/api/blog/getDraft/' + data.id).subscribe((res: any) => {
          this.isPrevious = true;
          console.log(res);
          this.body = res.Blog.body;
          this.title = res.Blog.title;
          this.imagesUrl = res.Blog.image;
          this.id = res.Blog._id;
          this.isDraft = res.Blog.isDraft;
          if (res.Blog.tag !== undefined) {
            this.categories.forEach((item, index) => {
              if (item.name === res.Blog.tag) {
                item.clicked = true;
                this.prevSelected = index;
              }
            })
          }
        });
      }
    });

  }
  ngOnDestroy() {
    console.log('destroyed');
    if (!this.isDraft && this.body !== undefined) {
      this.submitDraft();
    }
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
  openDialog(errorMessage) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: errorMessage,
        panelClass: 'error-dialog'
      }
    });
  }
  delete() {
    this.dialog.open(DeleteConfirmComponent, {
      data: {
        id: this.id
      }
    });
  }
  onSubmit() {
    // console.log(this.body);
    // console.log(this.title);
    // console.log(this.imagesUrl);


    if (this.body.match(/(\w+)/g).length < 60 || this.body === undefined) {
      this.openDialog('Blog must have at least 60 words');
      return;
    }
    if (this.imagesUrl.length < 2 || this.body === undefined) {
      this.openDialog('Blog must have at least 2 images');
      return;
    }
    if (this.title.match(/(\w+)/g).length < 3) {
      this.openDialog('Blog header must have at least 3 words');
      return;
    }
    if (this.prevSelected === undefined) {
      this.openDialog('Blog must have a category');
      return;
    }
    this.blogservice.saveBlog(this.title, this.body, this.imagesUrl, this.categories[this.prevSelected].name);
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
  submitDraft() {
    let categories
    if (this.categories[this.prevSelected] === undefined || this.prevSelected === undefined) {
      categories = undefined;
    } else {
      categories = this.categories[this.prevSelected];

    }
    this.blogservice.saveDraft(this.title, this.body, this.imagesUrl, categories);

  }
  updateDraft() {
    this.blogservice.updateDraft(this.id, this.title, this.body, this.imagesUrl, this.categories[this.prevSelected].name);
  }

  checkIfImg(i) {
    let ext = this.imagesUrl[i].split('.').pop();
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
      return true;
    } else if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') {
      return false;
    } else {
      return undefined;
    }
  }

  publishDraft() {
    this.blogservice.publishDraft(this.id, this.title, this.body, this.imagesUrl, this.categories[this.prevSelected].name);
  }
  toggleClicked(i) {
    if (this.prevSelected !== undefined) {
      this.categories[this.prevSelected].clicked = !this.categories[this.prevSelected].clicked;
    }
    this.categories[i].clicked = !this.categories[i].clicked;
    this.prevSelected = i;
  }
 }
@Component({
  selector: 'app-error-body',
  templateUrl: 'error-dialog.component.html',
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
@Component({
  selector: 'app-error-body',
  templateUrl: 'delete-confirm.component.html',
  styleUrls: ['./create.component.css']

})
export class DeleteConfirmComponent {
  id: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public blogService: BlogService, public http: HttpClient,
    public router: Router, public dialogRef: MatDialogRef<DeleteConfirmComponent>) {
    this.id = this.data.id;
  }
  removeBlog() {
    this.http.post('http://localhost:3000/api/blog/deleteBlog/' + this.id, {}).subscribe((val) => {
      console.log(val);
      this.dialogRef.close();
      this.router.navigate(['/draft']);
    });
  }
}
