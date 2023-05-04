import { SocialShareComponent } from 'app/social-share/social-share.component';
import { environment } from 'environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { DailyReadingsContent } from 'app/global-types';
import { ClipboardCopyService } from 'app/services/clipboard-copy.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocalStorageService } from "app/services/local-storage.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private clipboardManager: ClipboardCopyService,
    private matBottomSheet: MatBottomSheet,
    private storage: LocalStorageService,
  ) { }

  dailyReadings: any;
  error: string;
  isLoadingDailyReadings: boolean = false;
  daysDate: string = new Date().toDateString();

  // day's readings from backend
  fetchDailyReadings(date: string | Date) {
    this.error = "";
    this.isLoadingDailyReadings = true;
    const backendUri: string = environment.backendUri;
    return this.httpService.post(backendUri + "/fetchDailyReadings", { date: new Date(date).toDateString() })
      .subscribe({
        next: (results: any) => {
          this.dailyReadings = results;
          this.isLoadingDailyReadings = false;
          this.error = "";
          return this.storage.push('readings', { readings: results, error: null });
        },
        error: (error: any) => {
          this.isLoadingDailyReadings = false;
          this.error = error.message;
          return this.storage.push('readings', { readings: [], error: error.message });
        }
      })
  }

  /**
   * This method will convert all readings into a human readable format
   */
  readingsInHumanReadableFormat(selectedReadingSet: DailyReadingsContent[]): string {
    let stringifiedReadingArray = [];
    selectedReadingSet.map((readingSet: DailyReadingsContent) => {
      if (readingSet.massId) {
        stringifiedReadingArray.push(readingSet.massId.trim());
      }
      else if (readingSet.readingTitle && readingSet.readingAddress && readingSet.readingBody)
        stringifiedReadingArray.push(
          readingSet.readingTitle + "\n\n" + readingSet.readingAddress + "\n\n" + readingSet.readingBody.trim()
        )
    });
    return stringifiedReadingArray.join("\n\n");
  }

  /**
   * This method will copy readings to clipboard
   * @param currentIndexOfIteration the selected tab readings index
   */
  copyAllReadings(currentIndexOfIteration: number) {
    let selectedReadingSet = this.dailyReadings[currentIndexOfIteration];

    return this.clipboardManager.copyLongTextToClipboard(
      this.readingsInHumanReadableFormat(selectedReadingSet)
    )
  }

  /**
   * 
   * @param currentIndexOfIteration the selected tab readings index
   */
  shareAllReadings(currentIndexOfIteration: number) {
    let selectedReadingSet = this.dailyReadings[currentIndexOfIteration];
    this.matBottomSheet.open(SocialShareComponent, {
      data: this.readingsInHumanReadableFormat(selectedReadingSet)
    })
  }

  /**
   * 
   * @param currentIndexOfIteration the selected tab readings index
   */
  commentOnALL(currentIndexOfIteration: number) {
    console.log('comment on all', currentIndexOfIteration);
  }


  // single reading menu controllers
  shareSingleReading(reading: DailyReadingsContent) {
    let stringifiedReading = reading.readingTitle + "\n\n" + reading.readingAddress + "\n\n" + reading.readingBody.trim();
    this.matBottomSheet.open(SocialShareComponent, {
      data: stringifiedReading
    })
  }

  copySingleReading(reading: DailyReadingsContent) {
    let stringifiedReading = reading.readingTitle + "\n\n" + reading.readingAddress + "\n\n" + reading.readingBody.trim();
    return this.clipboardManager.copyLongTextToClipboard(stringifiedReading);
  }

  viewReadingFromTheBible(reading: DailyReadingsContent) {
    return Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: reading.readingSource,
    }).click()
  }

  ngOnInit(): void {
    this.fetchDailyReadings(new Date());
  }
}
