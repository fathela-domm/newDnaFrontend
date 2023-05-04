import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'home' },
  { path: '/daily_readings', title: 'Daily Readings', icon: 'library_books' },
  { path: '/catholic_news', title: 'Catholic News', icon: 'newspaper' },
  { path: '/catholic_prayers', title: 'Prayers', icon: 'church' },
  { path: '/rosaries', title: 'Rosaries', icon: 'bubble_chart' },
  { path: '/catholic_bible', title: 'Catholic Bible', icon: 'menu_book' },
  { path: '/logout', title: 'Sign Out', icon: 'logout' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
