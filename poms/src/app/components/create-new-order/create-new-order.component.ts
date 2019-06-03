import { UploadService } from './../../services/upload.service';
import {
  IResinType,
  IOrder,
  ICategory,
  ICustomer
} from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-create-new-order",
  templateUrl: "./create-new-order.component.html",
  styleUrls: ["./create-new-order.component.css"],
})
export class CreateNewOrderComponent implements OnInit {
  newDate = new Date();
  newOrderForm: FormGroup;
  categoryData: Array<ICategory> = this.backendService.mockedCategoryData;
  harzList: Array<IResinType> = this.backendService.resineData;
  customerData: Array<ICustomer> = this.backendService.customerData;
  @ViewChild("fileInputScan") fileInputScan;
  
  constructor(
    public dialogRef: MatDialogRef<CreateNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrder,
    private backendService: BackendService,
    private uploadService: UploadService
  ) {}
  ngOnInit() {
    this.newOrderForm = new FormGroup({
      order_id: new FormControl(this.data.order_id ? this.data.order_id : "", [
        Validators.minLength(1),
        Validators.required
      ]),
      group_id: new FormControl(this.data.group_id ? this.data.group_id : "", [
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
      harz: new FormControl(this.data.resin_name ? this.data.resin_name : "", [
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
      ),
      hochladen: new FormControl(
        this.fileInputScan.nativeElement ? this.fileInputScan.nativeElement : null,
        [Validators.required]
      ),
    });
    // this.backendService.getAllResin().then((res: Array<IResinType>) => {
    //   this.harzList = res;
    //   console.log(this.harzList);
    // });
  }
  // MS - only for testing
  //  onSubmit() {
  //   console.log(this.newOrderForm.value);
  // }
  onQuit(): void {
    this.dialogRef.close();
  }
  uploadScan(){
    console.log("uploadScan")

    // if (fi.files && fi.files[0]) {
    //   let fileToUpload = fi.files[0];
    //   this.uploadService.uploadScan(fileToUpload, 17).subscribe(res => {
    //     console.log(res);
    //   });
    // }
  }
}
