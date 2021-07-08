import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {

constructor(public router: Router, private location: Location) { }
  showCancleRoute = false;
iconColorHome = '#2D4A86';
iconColorFeed = '#778899';
iconColorExplore = '#778899';
  newRoute = false;
isHomeClicked = true;
isFeedClicked = false;
isExploreClicked = false;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log(event);
        var url = event.url.split('/');
        url = url.slice(-3, -1);
        var urlString = '/' + url[0] + '/' + url[1];
        // console.log(urlString);
        if (event.id === 1) {
          this.newRoute = true;
        } else {
          this.newRoute = false;

        }
        if (urlString === '/mobile/user' || urlString === '/mobile/blog' || event.url === '/mobile/user' || event.url === '/create' || urlString === '/mobile/blog' || urlString === '/user/profile') {
          this.showCancleRoute = true;

        } else {
          this.showCancleRoute = false;

        }
      }
    });
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
  crossClicked() {
    // console.log('back clicked');
    if (this.newRoute === false) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}




