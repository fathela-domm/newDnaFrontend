import { MysteriesOfTheRosary, SorrowsOfMary, Rosary } from './../global-types';
import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rosaries',
  templateUrl: './rosaries.component.html',
  styleUrls: ['./rosaries.component.scss']
})
export class RosariesComponent implements OnInit {

  isLoadingRosariesData: boolean = true;
  mysteries: MysteriesOfTheRosary[];
  sorrowsOfMary: SorrowsOfMary[];
  rosariesData: Rosary[];
  error: string = "";

  constructor(private httpService: HttpService) { }

  /**
   * fetch data for 7SR, divine mercy chaplet and the holy rosary
   */
  fetchRosariesData() {
    this.httpService.get('/assets/data/rosaries.json')
      .subscribe({
        next: (data: Rosary[]) => {
          this.rosariesData = data;
          return this.fetchMysteriesData();
        },
        error: (err: any) => {
          this.isLoadingRosariesData = false;
          this.error = err.message;
        }
      })
  }

  /**
   * fetch data of the mysteries of the rosaries 
   */
  fetchMysteriesData() {
    this.httpService.get('/assets/data/mysteriesOfTheRosary.json')
      .subscribe({
        next: (data: MysteriesOfTheRosary[]) => {
          this.mysteries = data;
          this.fetchTheSorrowsOfMaryData();
        },
        error: (err: any) => {
          this.isLoadingRosariesData = false;
          this.error = err.message;
        }
      })
  }

  /**
  * fetch data of the sorrows of the Mary 
  */
  fetchTheSorrowsOfMaryData() {
    this.httpService.get('/assets/data/sorrowsOfMary.json')
      .subscribe({
        next: (data: SorrowsOfMary[]) => {
          this.sorrowsOfMary = data;
          this.isLoadingRosariesData = false;
        },
        error: (err: any) => {
          this.isLoadingRosariesData = false;
          this.error = err.message;
        }
      })
  }

  ngOnInit(): void {
    this.fetchRosariesData();
  }

}
