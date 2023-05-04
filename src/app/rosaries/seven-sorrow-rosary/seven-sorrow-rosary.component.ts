import { SorrowsOfMary } from './../../global-types';
import { Component, OnInit, Input } from '@angular/core';
import { Rosary } from "app/global-types";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SocialShareComponent } from "app/social-share/social-share.component";

@Component({
  selector: 'seven-sorrow-rosary',
  templateUrl: './seven-sorrow-rosary.component.html',
  styleUrls: ['./seven-sorrow-rosary.component.scss']
})
export class SevenSorrowRosaryComponent implements OnInit {
  @Input() rosary: Rosary;
  @Input() sorrowsOfMary: SorrowsOfMary[];
  constructor(private matBottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  shareLocationHref() {
    return this.matBottomSheet.open(SocialShareComponent, {
      data: `How to pray the Rosary\n${location.href}`
    })
  }

  openTutorial() {
    return Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://youtu.be/LwnqifDJCXM',
    }).click()
  }
}