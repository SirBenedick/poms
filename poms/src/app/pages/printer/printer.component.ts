import { Component, OnInit, Input, Inject } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IPrinterData, IPrinterNew } from "../../shared/interfaces";
import { PopUpNeuerDruckerComponent } from "src/app/components/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { Observable, Subscription } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-printer",
  templateUrl: "./printer.component.html",
  styleUrls: ["./printer.component.css"]
})
export class PrinterComponent implements OnInit {
  everyPrinter: Array<Observable<IPrinterData>>;

  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Array<IPrinterData>
  ) {}

  ngOnInit() {
    this.refreshPrinterList();
  }

  openDialogNewDrucker(): void {
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
              this.refreshPrinterList();
            }
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
    this.backendService.startPrinter(id).then(data => console.log(data));
  }
  stopPrinter(id: Number) {
    this.backendService.stopPrinter(id).subscribe(data => console.log(data));
  }
  togglePrinter(id: Number) {
    this.backendService.togglePrinter(id).subscribe(data => console.log(data));
  }

  deletePrinter(printer_id: any): void {
    this.backendService.removePrinterById(printer_id).then(response => {
      this.refreshPrinterList();
    });
  }

  refreshPrinterList() {
    this.backendService.startPrinterObservable().then(res => {
      console.log("this.backendService.everyPrinter.length:", res)
      //this.everyPrinter = this.backendService.everyPrinter;
      setTimeout(res => this.everyPrinter = this.backendService.everyPrinter, 1500)
    });
  }
}
