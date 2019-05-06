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

  printerDataSubscription: Subscription;
  printerData: IPrinterData = {"printer_id":666,"name":"Exampledata","host":"141.19.113.185","port":8080,"is_printing":1,"current_layer":98,"max_layer":176,"print_start":"11:58:31","time_estimated":"01:06:51","model_height":18,"paused":0,"offline":0,"progress":0.5568181818181818};
  
  constructor(private backendService: BackendService) {}

  ngOnInit() {

    this.printerDataSubscription = timer(1000, 1500)
      .pipe(
        switchMap((counter: number) => this.backendService.printerGet(23)),
        catchError((err, caught) => caught)
      )
      .subscribe((newPrinterData: IPrinterData) => {
        console.log("Interval", newPrinterData);
        this.printerData = newPrinterData;
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.printerDataSubscription.unsubscribe();
  }
}
