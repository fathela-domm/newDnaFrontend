import { BibleBook } from './../global-types';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';

@Component({
  selector: 'bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {
  catholicBible: BibleBook[];
  isLoadingCatholicBible: boolean = true;
  error: string = "";

  constructor(
    private httpService: HttpService
  ) { }

  getTestament(testament: string): BibleBook[] {
    return this.catholicBible.filter((bibleBook: BibleBook) => bibleBook.testament == testament)
  }

  fetchWholeBible() {
    this.httpService.get('/assets/data/catholic_bible.json')
      .subscribe({
        next: (data: BibleBook[]) => {
          this.catholicBible = data;
          this.isLoadingCatholicBible = false;
        },
        error: (err: any) => {
          this.isLoadingCatholicBible = false;
          this.error = err.message;
        }
      });
  }

  ngOnInit(): void {
    this.fetchWholeBible()
  }
}
