import { Observable } from "rxjs";
import { IPrinterData } from "src/app/shared/interfaces";
import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PopUpNeuerDruckerComponent } from "../pop-ups/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { PopUpVanikComponent } from "../pop-ups/pop-up-vanik/pop-up-vanik.component";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() printer: Observable<IPrinterData>;
  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;
  printerStatus;
  printerInfo = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.printerInfo = {};
    this.printer.subscribe((printer: IPrinterData) => {
      this.printerInfo["host"] = printer.host;
      this.printerInfo["port"] = printer.port;
      this.printerInfo["name"] = printer.name;
      this.printerInfo["progress"] = printer.progress;
      this.printerInfo["max_layer"] = printer.max_layer;
      this.printerInfo["current_layer"] = printer.current_layer;
      this.printerInfo["resin_volume"] = printer.resin_volume;
    });
  }

  onDetailedView(detail): void {
    console.log("data:", this.printerInfo)
    console.log("detail‚:", detail)
    this.printerInfo;
    const dialogRef = this.dialog.open(PopUpVanikComponent, {
      data: { printerInfo: this.printerInfo, detail: detail }
    });

    dialogRef.afterClosed().subscribe(result => {
      result;
    });
  }
}
