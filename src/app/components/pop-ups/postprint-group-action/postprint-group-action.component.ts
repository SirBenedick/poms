import { BackendService } from "src/app/services/backend.service";
import { IGroupedOrders } from "./../../../shared/interfaces";
import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderComponent } from "src/app/pages/order/order.component";
import Swal from "sweetalert2";
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
      .alterGroupStatus(this.data.group_id, "prePrint")
      .then(response => {
        this.dialogRef.close({result: "refresh"})
      });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

  onFinishGroup() {
    this.backendService
      .alterGroupOrderStatus(this.data.group_id)
      .then(response => {
        this.dialogRef.close({result: "refresh"});
      });
  }

  downloadSliced() {
    console.log(this.data.file_sliced_name);
    this.backendService.downloadSlicedFileFromGroup(
      this.data.group_id,
      this.data.file_sliced_name
    );
  }
  downloadSolidFiles() {
    this.backendService.downloadSolidFilesFromGroup(
      this.data.group_id,
      `Solids_for_group_id_${this.data.group_id}`
    );
  }
}
