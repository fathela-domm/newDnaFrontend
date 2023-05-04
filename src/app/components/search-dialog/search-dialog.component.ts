import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { environment } from 'environments/environment';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  skeletonTextLength: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  searchResults: any[] = [];
  searchError: string = "";
  isLoadingSearchResults: boolean = false;
  searchInputValue: string = "";
  notFound: boolean = false;

  constructor(private httpService: HttpService) { }

  searchFormGroup: FormGroup = new FormGroup({
    searchInputFormControl: new FormControl()
  });

  searchInputSubscriber: Subscription;

  handleFormSubmission(event: any) {
    let searchInputValue = this.searchFormGroup.value.searchInputFormControl;
    if (searchInputValue) {
      event.preventDefault();
      return this.fetchSearchResults(searchInputValue);
    }
  }

  private fetchSearchResults(searchInputValue: string) {
    let inputValue = searchInputValue.trim();
    let backendUri = environment.backendUri;
    if (!inputValue) {
      this.isLoadingSearchResults = false
    };

    return this.httpService.post(backendUri + "/fetchDataFromGoogleCSE", { searchTerm: inputValue })
      .subscribe({
        next: (results: any) => {
          this.isLoadingSearchResults = false;
          this.searchResults = results;
          if (results.length === 0) {
            this.notFound = true;
          } else {
            this.notFound = false;
          }
        },
        error: (newError: any) => {
          this.notFound = false;
          this.isLoadingSearchResults = false;
          this.searchError = newError.message;
        },
      })
  }

  clearSearchInput() {
    this.isLoadingSearchResults = false;
    this.searchFormGroup.reset();
    return Object.keys(this.searchFormGroup.controls).forEach(key => {
      this.searchFormGroup.get('searchInputFormControl').setErrors(null);
    });
  }

  ngOnInit(): void {
    // setIsLoadingSearchResult to true on value change of the form control
    this.searchFormGroup.valueChanges
      .subscribe((formData: any) => {
        this.searchError = "";
        this.notFound = false;
        if (formData.searchInputFormControl) {
          this.searchResults = [];
          this.isLoadingSearchResults = true;
          this.searchInputValue = formData.searchInputFormControl;
        }
      });

    // debounce
    this.searchInputSubscriber = this.searchFormGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe((formData: any) => {
        let searchInputValue = formData.searchInputFormControl;
        return searchInputValue && this.fetchSearchResults(searchInputValue);
      });
  }

  ngOnDestroy(): void {
    this.searchInputSubscriber.unsubscribe();
  }
}