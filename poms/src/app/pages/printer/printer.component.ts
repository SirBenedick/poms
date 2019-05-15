import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";

import {
  tap,
  startWith,
  map,
  switchMap,
  catchError,
  take
} from "rxjs/operators";
import { interval, Observable, Subscription, timer } from "rxjs";
import { IUserData, IPrinterData } from "../../shared/interfaces";

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  typiCodeUserData: IUserData;
  userDataSubscription: Subscription;

  allPrinterData: Array<IPrinterData> = [];
  
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    //** First time page is loaded "this.backendService.allPrinterData" is still empty*/
    if(this.allPrinterData.length == 0){
      // setTimeout hat seinen eigenen scope und würde "this" anders zuordnen
      var that = this;
      setTimeout(function(){
        that.allPrinterData = that.backendService.allPrinterData;
      }, 300);
    }
    this.allPrinterData = this.backendService.allPrinterData;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
