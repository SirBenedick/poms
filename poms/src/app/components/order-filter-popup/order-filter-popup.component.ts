import { BackendService } from "./../../services/backend.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IFilterOrders, IResinType, IOrder, ICategory, IGroupedOrders } from "src/app/shared/interfaces";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-order-filter-popup",
  templateUrl: "./order-filter-popup.component.html",
  styleUrls: ["./order-filter-popup.component.css"]
})
export class OrderFilterPopupComponent implements OnInit {
  harzList: Array<IResinType> = this.backendService.resineData;

  filterParamForm: FormGroup;
  customerData: Array<IOrder> = this.backendService.mockedOrderData;
  categoryData: Array<ICategory> = this.backendService.mockedCategoryData;

  constructor(
    public dialogRef: MatDialogRef<OrderFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFilterOrders,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    this.filterParamForm = new FormGroup({
      harz: new FormControl(),
      dueDateStart: new FormControl(),
      dueDateEnd: new FormControl(),
      priority: new FormControl(),
      customer: new FormControl(),
      dentalPrintType: new FormControl(),
    });
  }
  onClick():void{
    console.log("Priorität wurde ausgewählt!")
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveInFilterFormate() {
    let startDate = this.filterParamForm.value.dueDateStart;
    let endDate = this.filterParamForm.value.dueDateEnd;
    let maxTimeForDateCreation = 8640000000000000;
    let dueDate = {
      start: startDate ? startDate : new Date("2019-01-01"),
      end: endDate ? endDate : new Date(maxTimeForDateCreation)
    };

    let data = this.filterParamForm.value;
    delete data.dueDateStart;
    delete data.dueDateEnd;

    data.dueDate = dueDate;

    if (data.dueDate)
      this.dialogRef.close({ data: this.filterParamForm.value });
  }
}
