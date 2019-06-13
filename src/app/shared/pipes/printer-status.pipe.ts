import { IPrinterData } from "src/app/shared/interfaces";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "printerStatus" })
export class PrinterStatusPipe implements PipeTransform {
  transform(printer: IPrinterData) {
    let printerStatus;
    if (printer.offline == 0) {
      if (printer.is_printing == 0) {
        printerStatus = "Standby";
      } else {
        printerStatus = printer.paused ? "Pausiert" : "Druckt";
      }
    } else {
      printerStatus = "offline";
    }
    return printerStatus;
  }
}
