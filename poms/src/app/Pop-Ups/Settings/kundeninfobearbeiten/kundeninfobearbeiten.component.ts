import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BackendService } from "src/app/services/backend.service";
import { MatDialogRef } from "@angular/material";
import { EinstellungenComponent } from "src/app/pages/einstellungen/einstellungen.component";
import { ICustomer } from "src/app/shared/interfaces";

@Component({
  selector: "app-kundeninfobearbeiten",
  templateUrl: "./kundeninfobearbeiten.component.html",
  styleUrls: ["./kundeninfobearbeiten.component.css"]
})
export class KundeninfobearbeitenComponent implements OnInit {
  alterCustomer: FormGroup;
  customerData: Array<ICustomer> = this.backendService.customerData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) {}

  ngOnInit() {
    this.alterCustomer = new FormGroup({
      customerAltered: new FormControl(),
      customerNew: new FormControl()
    });
  }
  onSaveButton(): void {
    let customerNew = {
      name: this.alterCustomer.value.customerNew
    };
    let alteredCustomer = this.alterCustomer.value.customerAltered;
    this.backendService
      .alterCustomer(alteredCustomer, customerNew)
      .then(response => this.backendService.loadCustomerData());
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
