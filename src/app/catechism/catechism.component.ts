import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'catechism',
  templateUrl: './catechism.component.html',
  styleUrls: ['./catechism.component.scss']
})
export class CatechismComponent implements OnInit {
  isLoadingIFrame: boolean = true;

  constructor() { }

  afterIFrameLoaded() {
    this.isLoadingIFrame = false;
    console.log('called', this.isLoadingIFrame);
  }

  ngOnInit(): void {
  }
}
