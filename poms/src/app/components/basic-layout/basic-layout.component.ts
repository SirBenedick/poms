import { Observable } from "rxjs";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
@Component({
  selector: "app-basic-layout",
  templateUrl: "./basic-layout.component.html",
  styleUrls: ["./basic-layout.component.css"]
})
export class BasicLayoutComponent implements OnInit {
  printerSubscription: Observable<Object>;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.printerSubscription = this.backendService.allPrinterData$;
  }

  newOrder() {
    console.log("function called");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.newOrder = result;
    });
  }
}
