import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog } from '@angular/material';

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
import { StatusComponent } from 'src/app/components/status/status.component';
import { NewPrinterComponent } from 'src/app/components/new-printer/new-printer.component';

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  typiCodeUserData: IUserData;
  userDataSubscription: Subscription;

  printerDataSubscription: Subscription;
  printerData: IPrinterData = {
    printer_id: 666,
    name: "Exampledata",
    host: "141.19.113.185",
    port: 8080,
    is_printing: 1,
    current_layer: 98,
    max_layer: 176,
    print_start: "11:58:31",
    time_estimated: "01:06:51",
    model_height: 18,
    paused: 0,
    offline: 0,
    progress: 0.5568181818181818
  };

  allPrinters: Array<any> = [
    {
      printer_id: 23,
      name: "TestPrinter",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.5568181818181818
    },
    {
      printer_id: 56,
      name: "Printer",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 0,
      current_layer: 98,
      max_layer: 176,
      print_start: "12:10:00",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 1,
      offline: 0,
      progress: 0.3568181818181818
    }
    //  Only for testing
    //  {
    //    "name": "Test",
    //  }
  ];

  constructor(private backendService: BackendService, public dialog: MatDialog) {}

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

  // newCreatePrinter(){
  //   console.log("New Printer is creating!")
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPrinterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
