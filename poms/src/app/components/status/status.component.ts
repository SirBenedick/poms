import { IPrinterData } from 'src/app/shared/interfaces';
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() printer: IPrinterData;

  printerStatus;

  constructor() {}

  ngOnInit() {
    if(this.printer.offline == 0){
      if(this.printer.is_printing == 0){
        this.printerStatus =  this.printer.paused ? 'Standby' : 'Standby';
      }else{
        this.printerStatus =  this.printer.paused ? 'Pausiert' : 'Druckt';
      }
    }else{
      this.printerStatus = "offline";
    }
  }
}
