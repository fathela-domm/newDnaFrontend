import { HttpService } from 'app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { CatholicNews, CatholicNewsFeed } from 'app/global-types';
import { environment } from 'environments/environment';
import { FormGroup, FormControl } from "@angular/forms"

@Component({
  selector: 'catholic-news',
  templateUrl: './catholic-news.component.html',
  styleUrls: ['./catholic-news.component.scss'],
})
export class CatholicNewsComponent implements OnInit {
  error: string = "";
  catholicNews: CatholicNews[];
  isLoadingNews: boolean = true;
  // initial number of news objects to render
  dataCount: number = 0;
  dataToRender: CatholicNews[] = [];

  catholicNewsFeeds: CatholicNewsFeed[] = [
    {
      label: "General",
      region: "general",
    }, {
      label: "Africa & MiddleEast",
      region: "africaMiddleEast",
    }, {
      label: "U.S.A",
      region: "usa",
    }, {
      label: "Vatican",
      region: "vatican",
    }, {
      label: "Americas",
      region: "americas",
    }, {
      label: "Asia & Pacific",
      region: "asiaPacific",
    }, {
      label: "Europe",
      region: "europe"
    }
  ]

  filterNewsFormGroup: FormGroup = new FormGroup({
    filterNewsByCategoryFormControl: new FormControl("")
  });

  constructor(private httpService: HttpService) { }

  appendData() {
    if (this.dataToRender.length < this.catholicNews?.length) {
      this.dataToRender = this.catholicNews?.filter((news: CatholicNews, i: number) => i <= this.dataCount + 4);
      this.dataCount += 5;
    }
  }

  fetchCatholicNews(category: string) {
    this.error = "";
    this.isLoadingNews = true;
    const backendUri: string = environment.backendUri;
    return this.httpService.post(backendUri + "/fetchNewsFromCNA", { feed: category })
      .subscribe({
        next: (results: CatholicNews[]) => {
          this.catholicNews = results;
          // render first 10 news elements 
          this.appendData();
          this.isLoadingNews = false;
          this.error = "";
        },
        error: (error: any) => {
          this.isLoadingNews = false;
          this.error = error.message;
        }
      })
  }

  addScrollToTopButton(scrollPosition: number) {
    let scrollTopBTN = document.getElementById('btn-scroll-top')
    if (scrollTopBTN) {
      if (scrollPosition >= 20)
        scrollTopBTN.style.display = 'block';
      else
        scrollTopBTN.style.display = "none";
    }
    return;
  }

  browserSupportsPassive(): boolean {
    var supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        }
      }));
    } catch (e: any) { }
    return supportsPassive;
  }

  addMobileBrowserInfiniteScroll() {
    if (this.browserSupportsPassive()) {
      document.body.addEventListener('touchmove', (e: any) => {
        this.addScrollToTopButton(Math.floor(window.scrollY));
        return Math.floor(window.scrollY) + window.innerHeight >= document.querySelector('.main-content').scrollHeight - 500 && this.appendData()
      });
    }
    else
      document.body.ontouchmove = (e: any) => {
        this.addScrollToTopButton(Math.floor(window.scrollY));
        return Math.floor(window.scrollY) + window.innerHeight >= document.querySelector('.main-content').scrollHeight - 500 && this.appendData()
      };
  }

  addInfiniteScrollLogic() {
    // to be rendered @ max-width 776px
    let mainPanel = document.querySelector('.main-panel');
    document.body.addEventListener('scroll', () => {
      this.addScrollToTopButton(document.body.scrollTop);
      return document.body.scrollTop + window.innerHeight >= document.querySelector('.main-content').scrollHeight - 500 && this.appendData()
    });
    this.addMobileBrowserInfiniteScroll()
    // to be rendered @ min-width 776px
    mainPanel.addEventListener('scroll', () => {
      this.addScrollToTopButton(mainPanel.scrollTop);
      return mainPanel.scrollTop + window.innerHeight >= document.querySelector('.main-content').clientHeight - 500 && this.appendData()
    });
  }

  ngOnInit(): void {
    this.filterNewsFormGroup.get('filterNewsByCategoryFormControl').setValue(this.catholicNewsFeeds[0].region);
    this.fetchCatholicNews(this.catholicNewsFeeds[0].region);
    this.addInfiniteScrollLogic();
    this.filterNewsFormGroup.valueChanges
      .subscribe((formData: any) => {
        const newsCategory = formData.filterNewsByCategoryFormControl;
        // fetch data from associated news category
        this.dataToRender = []
        this.dataCount = 0;
        return this.fetchCatholicNews(newsCategory);
      });
  }
}
