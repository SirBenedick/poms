import { IResinType, IOrder, ICategory } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-create-new-order",
  templateUrl: "./create-new-order.component.html",
  styleUrls: ["./create-new-order.component.css"]
})
export class CreateNewOrderComponent implements OnInit {
  newDate = new Date();
  newOrderForm: FormGroup;
  harzList: Array<IResinType>;
  categoryData: Array<ICategory> = this.backendService.mockedCategoryData;

  constructor(
    public dialogRef: MatDialogRef<CreateNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private backendService: BackendService
  ) {}
  ngOnInit() {
    this.newOrderForm = new FormGroup({
      orderId: new FormControl(this.data.orderId ? this.data.orderId : "", [
        Validators.minLength(1),
        Validators.required
      ]),
      groupId: new FormControl(this.data.groupId ? this.data.groupId : "", [
        Validators.minLength(1),
        Validators.required
      ]),
      customer: new FormControl(this.data.customer ? this.data.customer : "", [
        Validators.required
      ]),
      laboratory: new FormControl(
        this.data.laboratory ? this.data.laboratory : "",
        [Validators.required]
      ),
      patient: new FormControl(this.data.patient ? this.data.patient : "", [
        Validators.required
      ]),
      dentalPrintType: new FormControl(
        this.data.dentalPrintType ? this.data.dentalPrintType : "",
        [Validators.required]
      ),
      harz: new FormControl(this.data.harz ? this.data.harz : "", [
        Validators.required
      ]),
      dueDate: new FormControl(this.data.dueDate ? this.data.dueDate : "", [
        Validators.required
      ]),
      priority: new FormControl(this.data.priority ? this.data.priority : "", [
        Validators.required
      ]),
      creationDate: new FormControl(
        this.data.creationDate ? this.data.creationDate : "",
        [Validators.required]
      ),
      comment: new FormControl(this.data.comment ? this.data.comment : ""),
      fileScan: new FormControl(this.data.fileScan ? this.data.fileScan : "", [
        Validators.required
      ]),
      fileSolid: new FormControl(
        this.data.fileSolid ? this.data.fileSolid : "",
        [Validators.required]
      )
    });
    this.backendService.getAllResin().then((res: Array<IResinType>) => {
      this.harzList = res;
      console.log(this.harzList);
    });
  }
  // MS - only for testing
  //  onSubmit() {
  //   console.log(this.newOrderForm.value);
  // }

  onClick(): void {
    if (this.newOrderForm) {
      console.log("Form Submitted");
      console.log(this.newOrderForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
