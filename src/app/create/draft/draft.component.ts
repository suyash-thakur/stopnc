import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  drafts = [];
  constructor(public router: Router, public http: HttpClient, public auth: AuthenticationService) { }

  ngOnInit() {
    this.http.get(environment.backendLink + 'api/blog/draft' + this.auth.id).subscribe((res: any) => {
      // console.log(res);
      this.drafts = res.Blog;
    });
  }
  newBlog() {
    this.router.navigate(['/create']);
  }
  clickBlog(id) {
    this.router.navigate(['/create/' + id]);
  }
}
