import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public setLocation(latlng:any){
    localStorage.setItem("HomeLocation",JSON.stringify(latlng));

  }

  public getLocation(){
    return localStorage.getItem("HomeLocation");

  }
}
