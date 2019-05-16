import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  allPrinters: Array<IPrinterData> = [];
  newPrinter: String;
  constructor(private backendService: BackendService, public dialog: MatDialog) {}

  ngOnInit() {
    //** First time page is loaded "this.backendService.allPrinters" is still empty*/
    if(this.allPrinters.length == 0){
      // setTimeout hat seinen eigenen scope und würde "this" anders zuordnen
      var that = this;
      setTimeout(function(){
        that.allPrinters = that.backendService.allPrinterData;
      }, 300);
    }
    this.allPrinters = this.backendService.allPrinterData;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  // newCreatePrinter(){
  //   console.log("New Printer is creating!")
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPrinterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.newPrinter = result;
    });
  }
}
