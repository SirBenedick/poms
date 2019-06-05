import { Component, OnInit, Input, Inject } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IPrinterData, IPrinterNew } from "../../shared/interfaces";
import { PopUpNeuerDruckerComponent } from "src/app/components/pop-up-neuer-drucker/pop-up-neuer-drucker.component";

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  allPrinters: Array<IPrinterData> = [];

  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IPrinterNew,
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
  openDialogNewDrucker(): void {
    const dialogRef = this.dialog.open(PopUpNeuerDruckerComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          console.log("Dialog was closed", result.value);
          this.backendService.addNewPrinter(result.value).then((res: any) => {
            if (res.error)
              alert("Drucker konnte nicht hinzugefügt werden: \n" + res.error);
          });
        }
      }
    });
  }
  onPrinterClick(event) {
    this.printersNameDialogRef = this.dialog.open(PopUpNeuerDruckerComponent, {
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

  deletePrinter():void{
    alert(`Ihr Drucker wurde erfolgreich gelöscht!`)
    // this.backendService.removePrinterById(this.data.name).then(response => console.log(response));
  }
}
