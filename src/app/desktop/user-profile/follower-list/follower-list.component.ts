import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.css']
})
export class FollowerListComponent implements OnInit {
  userId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    console.log("follow");
   }

  ngOnInit() {
  }

}
