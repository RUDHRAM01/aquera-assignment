import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://swapi.dev/api/planets/';
  constructor(private httpClient: HttpClient) { }

  getData(pageNumber : any): Observable<any> {
    return this.httpClient.get(this.apiUrl + '?format=json' + `&page=${pageNumber}`).pipe(catchError((error: any) => {
      return throwError(error);
    }))
  }

  getResidentData(url : any): Observable<any> {
    return this.httpClient.get(url).pipe(catchError((error: any) => {
      return throwError(error);
    }))
  }
}
