import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  calls:any;

  constructor(private dataService:DataService){
    this.calls = dataService.CAD$;

  }
  
  test(t:any){
    console.log(t);
  
  }

}

