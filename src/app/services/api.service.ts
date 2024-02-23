import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `https://swapi.dev/api/planets/?format=json&page=${1}`;
  constructor(private httpClient: HttpClient) { }


  getData(): Observable<any> {
    return this.httpClient.get(this.apiUrl).pipe(catchError((error: any) => {
      return throwError(error);
    }));
  }
}
