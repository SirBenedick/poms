import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CreateNewOrderComponent } from "../create-new-order/create-new-order.component";
import { ICreateNewOrder } from "src/app/shared/interfaces";

@Component({
  selector: "app-new-printer",
  templateUrl: "./new-printer.component.html",
  styleUrls: ["./new-printer.component.css"]
})
export class NewPrinterComponent implements OnInit {
  newPrinterForm = new FormGroup({
    neuerDruckerName: new FormControl("", [
      Validators.minLength(1),
      Validators.required
    ])
  });

  constructor(
    public dialogRef: MatDialogRef<CreateNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateNewOrder
  ) {}

  ngOnInit() {}

  abbruchClick() {
    this.dialogRef.close();
  }
}
