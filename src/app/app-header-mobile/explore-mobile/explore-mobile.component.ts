import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-mobile',
  templateUrl: './explore-mobile.component.html',
  styleUrls: ['./explore-mobile.component.css']
})
export class ExploreMobileComponent implements OnInit {
  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
    { title: 'item 1' },

  ];
  constructor() { }

  ngOnInit() {
  }

}
