import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EinstellungenComponent } from "src/app/pages/einstellungen/einstellungen.component";
import { MatDialogRef } from "@angular/material";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-neuer-kunde",
  templateUrl: "./neuer-kunde.component.html",
  styleUrls: ["./neuer-kunde.component.css"]
})
export class NeuerKundeComponent implements OnInit {
  newCustomer: FormGroup;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) {}

  ngOnInit() {
    this.newCustomer = new FormGroup({
      kundenname: new FormControl(),
      straßehausnummer: new FormControl(),
      plz: new FormControl(),
      stadt: new FormControl(),
      land: new FormControl()
    });
  }
  onSaveButton(): void {
    let createCustomer = {
      name: this.newCustomer.value.kundenname
    };
    this.backendService
      .createCustomer(createCustomer)
      .then(response => this.backendService.loadCustomerData());
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

}
