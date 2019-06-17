import { Observable, Subscription } from "rxjs";
import { IPrinterData } from "src/app/shared/interfaces";
import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PopUpNeuerDruckerComponent } from "../pop-ups/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { PopUpVanikComponent } from "../pop-ups/pop-up-vanik/pop-up-vanik.component";
import Swal from 'sweetalert2';

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() printer: Observable<IPrinterData>;
  printersNameDialogRef: MatDialogRef<PopUpNeuerDruckerComponent>;

  /** Observable save polled data in printerDetails */
  printerDetails = {};

  /** Subscription for unsubscribing from polling on view exit*/
  printerSubscription: Subscription;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.printerSubscription = this.printer.subscribe(
      (printer: IPrinterData) => {
        this.printerDetails["host"] = printer.host;
        this.printerDetails["port"] = printer.port;
        this.printerDetails["name"] = printer.name;
        this.printerDetails["progress"] = printer.progress;
        this.printerDetails["max_layer"] = printer.max_layer;
        this.printerDetails["current_layer"] = printer.current_layer;
        this.printerDetails["resin_volume"] = printer.resin_volume;
      }
    );
  }
  ngOnDestroy() {
    this.printerSubscription.unsubscribe();
  }

  onDetailedView(detail): void {
    /** Opens PopUp and matches clicked "detail" value with printerDetails to display relevant content  */
    const dialogRef = this.dialog.open(PopUpVanikComponent, {
      data: { printerDetails: this.printerDetails, detail: detail }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  onInfoClick():void{
    Swal.fire({
      title: 'Fehler!',
      text:'Keine näheren Informationen hinterlegt',
      confirmButtonText: "Verstanden",
      confirmButtonColor: "#62c6d6",
      background: 'url(../assets/svg/FehlerPopUp.svg)',
    })
  }
}
