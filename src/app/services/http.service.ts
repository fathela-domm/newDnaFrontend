import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  /**
   *
   * @param url to get the data from
   * @param options Http request options
   * @returns a promise of a get request using angular http client
   */
  public get(url: string): Observable<any> {
    return this.httpClient.get(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * 
   * @param url to post the data to
   * @param data an object containing data of type any to post
   * @returns a promise of a post request using angular http cient
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "observe": "body",
      "responseType": "json"
    }),
  };
  public post(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, JSON.stringify(data), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  /**
  *
  * @param url to update the data
  * @param data an object containing data of type any to patch
  * @returns a promise of a put request using angular http client
  */
  public patch(url: string, data: any): Observable<any> {
    return this.httpClient.patch(url, JSON.stringify(data), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
  *
  * @param url to delete the data from
  * @returns a promise of a get request using angular http client
  */
  public delete(url: string) {
    return this.httpClient.delete(url).
      pipe(retry(2), catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Server returned code ${error.status}, error was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('An error has occured when processing your request. Please check the integrity of your network then try again.'));
  }
}
