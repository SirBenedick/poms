import { Component, OnInit, Input } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { IPrinterData } from "../../shared/interfaces";
import { PopUpNeuerDruckerComponent } from 'src/app/components/pop-up-neuer-drucker/pop-up-neuer-drucker.component';

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  allPrinters: Array<IPrinterData> = [];
  newPrinter: String;
  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //** First time page is loaded "this.backendService.allPrinters" is still empty*/
    if (this.backendService.allPrinterData.length == 0) {
      this.backendService
        .pollAllPrinterFromBackend()
        .toPromise()
        .then((allPrinterData: Array<IPrinterData>) => {
          this.allPrinters = allPrinterData;
        });
    } else {
      this.allPrinters = this.backendService.allPrinterData;
    }
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(CreateNewOrderComponent, {
  //     data: { key: "Example, maybe no data is needed" }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("The create new Printer Dialog was closed, result: ", result);
  //   });
  // }
  openDialogPopUpDrucker(): void {
    const dialogRef = this.dialog.open(PopUpNeuerDruckerComponent, {
      data: { newPrinterForm: this.newPrinter }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      this.newPrinter = result;
      // if (result) this.filterGroupData(result.data);
    });
  }
  onPrinterClick(event){
    this.printersNameDialogRef = this.dialog.open(PopUpNeuerDruckerComponent,{
      data: event.printer
    });
  }

  startPrinter(id: Number) {
    this.backendService.startPrinter(id).subscribe(data => console.log(data));
  }
  stopPrinter(id: Number) {
    this.backendService.stopPrinter(id).subscribe(data => console.log(data));
  }
  togglePrinter(id: Number) {
    this.backendService.togglePrinter(id).subscribe(data => console.log(data));
  }
}
