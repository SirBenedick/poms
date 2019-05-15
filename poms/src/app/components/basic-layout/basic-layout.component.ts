import { Subscription } from 'rxjs';
import { Observable, timer } from 'rxjs';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IPrinterData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {

  printerSubscription: Observable<Object>;

  constructor(private backendService: BackendService) { 
  }
  
  ngOnInit() {
    console.log("basic ngOnInit")
    this.printerSubscription = this.backendService.allPrinterDataObservable
    // .subscribe((newPrinterData: Array<IPrinterData>) => {
    //   console.log("Polling new Data", newPrinterData);
    //   // this.allPrinterData = newPrinterData;
    // });

  }

  newOrder(){
    console.log("function called");
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
