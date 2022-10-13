import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public CAD$: Observable<any>;
  public ClosedOnDate$: Observable<any>;


  public activeCalls: Subject<any[]> = new Subject<any[]>();
  public closedCalls: Subject<any[]> = new Subject<any[]>();


  constructor(private http: HttpService) { 

    this.getActiveCalls();
  }

  public getActiveCalls(){
    return this.CAD$ = this.http.getActiveCalls().pipe(map(data=>{
      this.activeCalls = data.calls;
      return data;
    }));
  }

  public getClosedCallsOnDate(date:string)
  {
   return this.ClosedOnDate$ = this.http.getClosedCallsOnDate(date).pipe(map(data=>{
      this.closedCalls = data.calls;
      return data;

    }))

  }

  public setLocation(latlng:any){
    localStorage.setItem("HomeLocation",JSON.stringify(latlng));

  }

  public getLocation(){
    return localStorage.getItem("HomeLocation");

  }
}
