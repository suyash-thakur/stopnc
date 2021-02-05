import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {

constructor(public router: Router) { }

iconColorHome = '#2D4A86';
iconColorFeed = '#778899';
iconColorExplore = '#778899';

isHomeClicked = true;
isFeedClicked = false;
isExploreClicked = false;
ngOnInit() {
}


homeClicked() {
  this.isHomeClicked = true;
  this.isFeedClicked = false;
  this.isExploreClicked = false;

  this.iconColorHome = '#2D4A86';
  this.iconColorFeed = '#778899';
  this.iconColorExplore = '#778899';
  this.router.navigate(['/mobile/home']);
}

feedClicked() {
  this.isHomeClicked = false;
  this.isFeedClicked = true;
  this.isExploreClicked = false;

  this.iconColorHome = '#778899';
  this.iconColorFeed = '#2D4A86';
  this.iconColorExplore = '#778899';
  this.router.navigate(['/mobile/feed']);

}

exploreClicked() {
  this.isHomeClicked = false;
  this.isFeedClicked = false;
  this.isExploreClicked = true;

  this.iconColorHome = '#778899';
  this.iconColorFeed = '#778899';
  this.iconColorExplore = '#2D4A86';
  this.router.navigate(['/mobile/explore']);

}
}




