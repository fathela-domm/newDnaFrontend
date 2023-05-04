import { MysteriesOfTheRosary } from './../../global-types';
import { Component, OnInit, Input } from '@angular/core';
import { Rosary } from "app/global-types";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { SocialShareComponent } from "app/social-share/social-share.component";
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'the-rosary',
  templateUrl: './the-rosary.component.html',
  styleUrls: ['./the-rosary.component.scss']
})
export class TheRosaryComponent implements OnInit {
  @Input() rosary: Rosary;
  @Input() mysteries: MysteriesOfTheRosary[];

  filteredMysteries: MysteriesOfTheRosary[];

  constructor(private matBottomSheet: MatBottomSheet, private matDialog: MatDialog) { }

  selectedMysteryForm: FormGroup = new FormGroup({
    selectedMysterySet: new FormControl("")
  });

  filterMysteries(mysterySetName: string): MysteriesOfTheRosary[] {
    return this.mysteries.filter((mysterySet: MysteriesOfTheRosary) => {
      return mysterySet.name === mysterySetName;
    });
  }

  ngOnInit(): void {
    this.filteredMysteries = this.mysteries;
    this.selectedMysteryForm.valueChanges
      .subscribe((formData: any) => {
        this.filteredMysteries = this.filterMysteries(formData.selectedMysterySet);
      })
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
      href: 'https://youtu.be/MA2Fsjjwvrk',
    }).click()
  }
}