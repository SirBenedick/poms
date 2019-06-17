import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { IPrinterData, IPrinterDataPolling } from "../../shared/interfaces";
import { PopUpNeuerDruckerComponent } from "src/app/components/pop-ups/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { take } from "rxjs/operators";
import Swal from 'sweetalert2';
@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  refreshWaitTimeInMs: number = 2000;

  /** "printerData" mapped to this.backendService.everySinglePrinter$ to display in printer.html */
  printerData: Array<IPrinterDataPolling> = [];
  printerStatusHasLoaded: boolean = false;

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

    this.getPrinterStatusForEachPrinter();
  }

  /** Evaluates the printer status and sets the corresponding css-style  */
  getPrinterStatusForEachPrinter(): void {
    this.printerData.forEach(printerData => {
      printerData.printer$.pipe(take(1)).subscribe((printer: IPrinterData) => {
        let printerStatus = { style: null, message: null };
        if (printer.offline == 0) {
          if (printer.is_printing == 0) {
            printerStatus.message = "verfügbar";
            printerStatus.style = "button-style";
          } else {
            if (printer.paused) {
              printerStatus.message = "pausiert";
              printerStatus.style = "button-style-printing";
            } else {
              printerStatus.message = "druckt gerade...";
              printerStatus.style = "button-style-printing";
            }
          }
        } else {
          printerStatus.message = "offline";
          printerStatus.style = "button-style";
        }
        printerData.status = printerStatus;
      });
    });
  }

  /** Opens new Dialog for adding a new printer, after close refreshes existing printer list */
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
              Swal.fire({
                title: 'Fehler!',
                text:"Drucker konnte nicht hinzugefügt werden: \n" + res.error,
                confirmButtonText: "Ok",
                confirmButtonColor: "#62c6d6",
                background: 'url(../assets/svg/FehlerPopUp.svg)',
              })
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
    // this.backendService.removePrinterById(printer_id).then(res => {
    //   console.log("removePrinterById: ", res);
    //   setTimeout(res => this.refreshPrinterList(), this.refreshWaitTimeInMs);
    // });
    Swal.fire({
      title: 'Drucker gelöscht!',
      text:"Der Drucker wurde erfolgreich gelöscht",
      confirmButtonText: "Ok",
      confirmButtonColor: "#62c6d6",
      background: 'url(../assets/svg/FehlerPopUp.svg)',
    })
  }

  refreshPrinterList() {
    this.printerData = this.backendService.everySinglePrinter$;
    this.getPrinterStatusForEachPrinter();
  }

  /** Methodes are used to demonstrate controlling of printer, no use in production */
  startPrinter(id: Number) {
    this.backendService.startPrinter(id).then(data => {
      console.log(data);
      this.getPrinterStatusForEachPrinter();
    });
  }
  stopPrinter(id: Number) {
    this.backendService.stopPrinter(id).subscribe(data => {
      console.log(data);
      this.getPrinterStatusForEachPrinter();
    });
  }
  togglePrinter(id: Number) {
    this.backendService.togglePrinter(id).subscribe(data => {
      console.log(data);
      this.getPrinterStatusForEachPrinter();
    });
  }
}
