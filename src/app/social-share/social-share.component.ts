import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SocialShareLink } from "app/global-types";
import socialShareLinkGenerator from './social-share.links';

@Component({
  selector: 'social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: string) { }

  socialShareLinks: SocialShareLink[] = socialShareLinkGenerator(this.data);

  ngOnInit(): void {
  }
}
