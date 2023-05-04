import { Component, OnInit, Input } from '@angular/core';
import { Rosary } from "app/global-types";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SocialShareComponent } from "app/social-share/social-share.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'divine-mercy-rosary',
  templateUrl: './divine-mercy-rosary.component.html',
  styleUrls: ['./divine-mercy-rosary.component.scss']
})
export class DivineMercyRosaryComponent implements OnInit {
  @Input() rosary: Rosary;
  constructor(private matBottomSheet: MatBottomSheet, private matDialog: MatDialog) { }

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
      href: ' https://youtu.be/fQr4rDXUeQ0',
    }).click()
  }
}
