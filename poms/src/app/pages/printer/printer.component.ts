import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog } from "@angular/material";
import { IPrinterData } from "../../shared/interfaces";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { PopUpNeuerDruckerComponent } from 'src/app/components/pop-up-neuer-drucker/pop-up-neuer-drucker.component';

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  allPrinters: Array<IPrinterData> = [];

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
      // data: { newOrderForm: this.newOrder }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      // if (result) this.filterGroupData(result.data);
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
