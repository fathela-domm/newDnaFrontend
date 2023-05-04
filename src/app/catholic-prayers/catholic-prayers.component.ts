import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { CatholicPrayers, CatholicPrayersContent } from "app/global-types"
import { ClipboardCopyService } from 'app/services/clipboard-copy.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SocialShareComponent } from 'app/social-share/social-share.component';

@Component({
  selector: 'catholic-prayers',
  templateUrl: './catholic-prayers.component.html',
  styleUrls: ['./catholic-prayers.component.scss']
})
export class CatholicPrayersComponent implements OnInit {
  error: string = "";
  prayers: CatholicPrayers[];
  filteredPrayers: CatholicPrayers[];
  isLoadingPrayersData: boolean = true;

  filterFormGroup: FormGroup = new FormGroup({
    filterPrayerByCategoryControl: new FormControl(),
    filterPrayerByNameControl: new FormControl()
  })

  constructor(
    private clipboardManager: ClipboardCopyService,
    private matBottomSheet: MatBottomSheet,
    private httpService: HttpService
  ) { }

  filterPrayersByCategory(category: string) {
    this.filteredPrayers = this.prayers.filter((prayerSet: CatholicPrayers) => {
      return prayerSet.category === category;
    });
    return this.filteredPrayers;
  }

  filterPrayersByName(userInput: string, prayersToFilter: CatholicPrayers[]) {
    let regExp = new RegExp(userInput, 'gi');
    let result: CatholicPrayers[] = [];
    prayersToFilter.map((prayerSet: CatholicPrayers) => {
      result.push({
        intro: "",
        category: "",
        prayers: prayerSet.prayers.filter((prayer: CatholicPrayersContent) => prayer.prayer.match(regExp) || prayer.title.match(regExp))
      });
    });
    this.filteredPrayers = result;
    return this.filteredPrayers;
  }

  filterPrayersByBothCategoryAndName(category: string, userInput: string) {
    this.filteredPrayers = this.filterPrayersByCategory(category);
    this.filteredPrayers = this.filterPrayersByName(userInput, this.filteredPrayers);
  }

  sharePrayers(prayer: CatholicPrayersContent) {
    let dataToShare = `Title: ${prayer.title}\n\nPrayer:\n${prayer.prayer}\n\nInfo:\n${prayer.intro}`
    this.matBottomSheet.open(SocialShareComponent, {
      data: dataToShare
    })
  }

  copyPrayers(prayer: CatholicPrayersContent) {
    let dataToShare = `Title: ${prayer.title}\n\nPrayer:\n${prayer.prayer}\n\nInfo:\n${prayer.intro}`
    return this.clipboardManager.copyLongTextToClipboard(dataToShare);
  }

  reset() {
    this.filteredPrayers = this.prayers;
    this.filterFormGroup.reset();
  }

  fetchCatholicPrayers() {
    this.httpService.get('/assets/data/catholic_prayers.json')
      .subscribe({
        next: (data: CatholicPrayers[]) => {
          this.prayers = data;
          this.filteredPrayers = data;
          this.isLoadingPrayersData = false;
        },
        error: (err: any) => {
          this.isLoadingPrayersData = false;
          this.error = err.message;
        }
      });
  }

  ngOnInit(): void {
    this.fetchCatholicPrayers();
    this.filterFormGroup.valueChanges
      .subscribe((formData: any) => {
        let categorySelected = formData.filterPrayerByCategoryControl;
        let userInput = formData.filterPrayerByNameControl;

        if (categorySelected && !userInput) {
          return this.filterPrayersByCategory(categorySelected);
        }
        else if (categorySelected && userInput) {
          return this.filterPrayersByBothCategoryAndName(categorySelected, userInput);
        }
        else if (!categorySelected && userInput) {
          return this.filterPrayersByName(userInput, this.prayers)
        }
      });
  }

}
