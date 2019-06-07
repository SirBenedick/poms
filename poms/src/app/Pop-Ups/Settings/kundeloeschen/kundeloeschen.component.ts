import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { EinstellungenComponent } from "src/app/pages/einstellungen/einstellungen.component";
import { BackendService } from "src/app/services/backend.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IOrder, ICustomer } from "src/app/shared/interfaces";

@Component({
  selector: "app-kundeloeschen",
  templateUrl: "./kundeloeschen.component.html",
  styleUrls: ["./kundeloeschen.component.css"]
})
export class KundeloeschenComponent implements OnInit {
  deleteCustomer: FormGroup;
  customerData: Array<ICustomer> = this.backendService.customerData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder
  ) {}

  ngOnInit() {
    this.deleteCustomer = new FormGroup({
      customerDelete: new FormControl()
    });
  }
  onSaveButton(): void {
    this.backendService
      .removeCustomerByName(this.deleteCustomer.value.customerDelete, null)
      .then(response => this.backendService.loadCustomerData());
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
