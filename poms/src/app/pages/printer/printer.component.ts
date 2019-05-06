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
  printerData: IPrinterData;

  constructor(private backendService: BackendService) {}

  ngOnInit() {

    this.printerDataSubscription = timer(1000, 1500)
      .pipe(
        switchMap((counter: number) => this.backendService.printerGet(23)),
        catchError((err, caught) => caught)
      )
      .subscribe((printerData: IPrinterData) => {
        console.log("Interval", printerData);
        this.printerData = printerData;
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.printerDataSubscription.unsubscribe();
  }
}
