import { BackendService } from "src/app/services/backend.service";
import { IGroupedOrders } from "./../../../shared/interfaces";
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderComponent } from "src/app/pages/order/order.component";

@Component({
  selector: "app-postprint-group-action",
  templateUrl: "./postprint-group-action.component.html",
  styleUrls: ["./postprint-group-action.component.css"]
})
export class PostprintGroupActionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGroupedOrders,
    public dialogRef: MatDialogRef<OrderComponent>,
    private backendService: BackendService
  ) {}
  ngOnInit() {}

  onRepeatPrintJob() {
    console.log("onRepeatPrintJob");
    this.backendService
      .alterGroupStatus(this.data.group_id, "preprint")
      .then(response => console.log("alterGroupStatus: ", response));
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

  onFinishGroup() {
    console.log("onFinishGroup");
    this.backendService
      .alterGroupOrderStatus(this.data.group_id)
      .then(response => console.log("alterGroupOrderStatus: ", response));
  }

  downloadSkin() {
    console.log("downloadSkin");
  }

  downloadSliced() {
    console.log("downloadSliced");
    this.backendService
      .downloadSlicedFileFromGroup(this.data.group_id)
      .then(response => {
        if (response["error"]) {
          alert(response["error"]);
        } else {
          console.log("downloadFile", response);
        }
      });
  }
}
