import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getAllCalls(): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/api/v1/calls/all').pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getActiveCalls(): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/api/v1/calls/active').pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getClosedCalls(): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/api/v1/calls/closed').pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getCallsOnDate(date: Date): Observable<any> {
    return this.http
      .get<any>(environment.apiURL + '/api/v1/calls/all/' + date)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
