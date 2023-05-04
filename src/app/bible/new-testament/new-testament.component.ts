import { Component, Input, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BibleBook, BibleChapter } from 'app/global-types';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'new-testament',
  templateUrl: './new-testament.component.html',
  styleUrls: ['./new-testament.component.scss']
})
export class NewTestamentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('bible') newTestamentBible: BibleBook[];
  chapterToRender: BibleChapter;
  moveToNextChapterDisabled: boolean = false;
  moveToPreviousChapterDisabled: boolean = false;

  filteredBibleBooks: ReplaySubject<any> = new ReplaySubject(1);
  filteredBibleChapters: ReplaySubject<any> = new ReplaySubject(1);
  filterBibleByBookSearchCtrl: FormControl = new FormControl();
  filterBibleByChapterSearchCtrl: FormControl = new FormControl();

  filterFormGroup: FormGroup = new FormGroup({
    filterBibleByBook: new FormControl(),
    filterBibleByChapter: new FormControl(),
  })

  protected _onDestroy = new Subject<void>();

  @ViewChild('bibleBookSelect', { static: true }) bibleBookSelect: MatSelect;
  @ViewChild('bibleChapterSelect', { static: true }) bibleChapterSelect: MatSelect;

  constructor() { }

  private sortBibleBooksChapters(book: BibleBook): BibleBook {
    book.chapters = book.chapters.sort((bibleBookChapterA: BibleChapter, bibleBookChapterB: BibleChapter) => (bibleBookChapterA.no > bibleBookChapterB.no) ? 1 : -1);
    return book;
  }

  private sortBibleBooks(): BibleBook[] {
    return this.newTestamentBible.sort((bibleBookA: BibleBook, bibleBookB: BibleBook) => (bibleBookA.no > bibleBookB.no) ? 1 : -1)
  }

  /**
   filter by book in the bible
   * @returns the first result matching the param book passed
    */
  getBibleBook(book: string = 'Matthew'): BibleBook {
    let selectedBook = this.sortBibleBooks().filter((bookInTheBible: BibleBook) => bookInTheBible.book === book)[0];
    return this.sortBibleBooksChapters(selectedBook);
  }

  set bibleChapter(object: any) {
    this.chapterToRender = this.getBibleBook(object.book).chapters.filter((bibleBookChapter: BibleChapter) => bibleBookChapter.no === object.chapter)[0]
    this.activateOrDeactivateButtons();
  }

  moveToNextChapter() {
    let nextChapter = this.chapterToRender.no + 1;
    this.bibleChapter = ({ book: this.chapterToRender.book, chapter: nextChapter });
    this.filterFormGroup.get('filterBibleByChapter').setValue(nextChapter);
  }


  moveToPreviousChapter() {
    let previousChapter = this.chapterToRender.no - 1;
    this.bibleChapter = ({ book: this.chapterToRender.book, chapter: previousChapter });
    this.filterFormGroup.get('filterBibleByChapter').setValue(previousChapter);
  }

  activateOrDeactivateButtons() {
    if (this.chapterToRender) {
      this.moveToNextChapterDisabled = (this.chapterToRender.no <= this.getBibleBook(this.chapterToRender.book).chapters.length - 1) ? false : true;
      this.moveToPreviousChapterDisabled = (this.chapterToRender.no > 1) ? false : true;
    }
  }

  ngOnInit(): void {
    this.bibleChapter = ({
      book: "Matthew",
      chapter: 1
    });

    this.filterFormGroup.valueChanges
      .subscribe((formData: any) => {
        let selectedBook = formData.filterBibleByBook || this.chapterToRender.book;
        let selectedChapter = formData.filterBibleByChapter || 1;
        this.bibleChapter = ({
          book: selectedBook,
          chapter: selectedChapter
        })
        this.filterFormGroup.get('filterBibleByBook').valueChanges
          .subscribe((formData) => {
            this.filterFormGroup.get('filterBibleByChapter').setValue(1);
            let currentBook = this.getBibleBook(this.chapterToRender.book).chapters;
            this.filteredBibleChapters.next(currentBook.slice());
          })
      });
    this.matSelectInputSearchConfig();
  }

  matSelectInputSearchConfig() {
    this.filteredBibleBooks.next(this.newTestamentBible.slice());
    this.filteredBibleChapters.next(this.getBibleBook(this.chapterToRender.book).chapters.slice());
    this.filterBibleByBookSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBooks();
      });
    this.filterBibleByChapterSearchCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterChapters();
      });
  }

  filterBooks() {
    let search = this.filterBibleByBookSearchCtrl.value;
    if (!search) {
      this.filteredBibleBooks.next(this.newTestamentBible.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredBibleBooks.next(
      this.newTestamentBible.filter(book => book.book.toLowerCase().indexOf(search) > -1)
    );
  }

  filterChapters() {
    let search = this.filterBibleByChapterSearchCtrl.value;
    if (!search) {
      let currentBookChapters = this.getBibleBook(this.chapterToRender.book).chapters;
      this.filteredBibleChapters.next(currentBookChapters.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBibleChapters.next(
      this.getBibleBook(this.chapterToRender.book).chapters.filter(chapter => String(chapter.no).toLowerCase().indexOf(search) > -1)
    );
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filterFormGroup.get('filterBibleByBook').setValue('Matthew');
    this.filterFormGroup.get('filterBibleByChapter').setValue(1);
    this.bibleBookSelect && this.filteredBibleBooks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.bibleBookSelect.compareWith = (a: BibleBook, b: BibleBook) => a && b && a.book === b.book;
      });
    this.bibleChapterSelect && this.filteredBibleChapters
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.bibleChapterSelect.compareWith = (a: BibleChapter, b: BibleChapter) => a && b && a.no === b.no;
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
