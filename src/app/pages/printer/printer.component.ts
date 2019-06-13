import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { IPrinterData, IPrinterDataPolling } from "../../shared/interfaces";
import { PopUpNeuerDruckerComponent } from "src/app/components/pop-ups/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  refreshWaitTimeInMs: number = 2000;

  /** "printerData" mapped to this.backendService.everySinglePrinter$ to display in printer.html */
  printerData: Array<IPrinterDataPolling> = [];

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Array<IPrinterData>
  ) {}

  ngOnInit() {
    /** First start backendService might not have polled data yet */
    if (this.backendService.everySinglePrinter$.length == 0)
      setTimeout(res => this.refreshPrinterList(), this.refreshWaitTimeInMs);
    else this.refreshPrinterList();
  }

  openDialogNewPrinter(): void {
    const dialogRef = this.dialog.open(PopUpNeuerDruckerComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          console.log("Dialog was closed", result.value);
          this.backendService.addNewPrinter(result.value).then((res: any) => {
            if (res.error) {
              alert("Drucker konnte nicht hinzugefügt werden: \n" + res.error);
            } else {
              console.log("added printer");
              setTimeout(
                res => this.refreshPrinterList(),
                this.refreshWaitTimeInMs
              );
            }
          });
        }
      }
    });
  }

  deletePrinter(printer_id: any): void {
    this.backendService.removePrinterById(printer_id).then(res => {
      console.log("removePrinterById: ", res);
      setTimeout(res => this.refreshPrinterList(), this.refreshWaitTimeInMs);
    });
  }

  refreshPrinterList() {
    this.printerData = this.backendService.everySinglePrinter$;
  }

  startPrinter(id: Number) {
    this.backendService.startPrinter(id).then(data => console.log(data));
  }
  stopPrinter(id: Number) {
    this.backendService.stopPrinter(id).subscribe(data => console.log(data));
  }
  togglePrinter(id: Number) {
    this.backendService.togglePrinter(id).subscribe(data => console.log(data));
  }
}
