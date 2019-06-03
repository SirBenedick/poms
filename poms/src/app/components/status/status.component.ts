import { IPrinterData } from "src/app/shared/interfaces";
import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PopUpNeuerDruckerComponent } from "../pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { PopUpVanikComponent } from '../pop-up-vanik/pop-up-vanik.component';
import { PopUpFAQComponent } from '../pop-up-faq/pop-up-faq.component';
import { PopUpDruckenComponent } from '../pop-up-drucken/pop-up-drucken.component';

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() printer: IPrinterData;
  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;
  printerStatus;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.printer.offline == 0) {
      if (this.printer.is_printing == 0) {
        this.printerStatus = this.printer.paused ? "Standby" : "Standby";
      } else {
        this.printerStatus = this.printer.paused ? "Pausiert" : "Druckt";
      }
    } else {
      this.printerStatus = "offline";
    }
  }

  //Klick damit man Informationen erhält: bisher noch nicht in HTML verbaut
  onPrinterName(event) {
    this.printersNameDialogRef = this.dialog.open(PopUpNeuerDruckerComponent, {
      data: event.printer
    });
  }

   onDetailedView(detail: any): void {
     const dialogRef = this.dialog.open(PopUpVanikComponent, {
       data: detail
     });

      dialogRef.afterClosed().subscribe(result => {
        result;
      });
    }
}
