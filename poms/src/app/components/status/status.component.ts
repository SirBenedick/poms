import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() druckerStatus: String;
  @Input() fuellstand: String;
  @Input() details: String;
  @Input() druckFortschritt: String;
  @Input() restlicheDruckzeit: String;
  @Input() printStart: String;
  @Input() temperatur: String;
  @Input() printerName: String;

  constructor() {}

  ngOnInit() {}
}
