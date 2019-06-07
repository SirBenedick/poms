import { UploadService } from "./../../services/upload.service";
import {
  IResinType,
  IOrder,
  ICategory,
  ICustomer,
  ICategoryName
} from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-new-order",
  templateUrl: "./create-new-order.component.html",
  styleUrls: ["./create-new-order.component.css"]
})
export class CreateNewOrderComponent implements OnInit {
  newDate = new Date();
  newOrderForm: FormGroup;
  categoryData: Array<ICategory> = this.backendService.categorysData;
  harzList: Array<IResinType> = this.backendService.resineData;
  customerData: Array<ICustomer> = this.backendService.customerData;

  fileToUploadName: string;

  @ViewChild("fileInputScan") fileInputScan;
  customer_name: string;
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
      customer_id: new FormControl("", [Validators.required]),
      laboratory: new FormControl(
        this.data.laboratory ? this.data.laboratory : "",
        [Validators.required]
      ),
      patient: new FormControl(this.data.patient ? this.data.patient : "", [
        Validators.required
      ]),
      dental_print_type: new FormControl(
        this.data.dental_print_type
          ? this.data.dental_print_type
          : "Bitte auswählen",
        [Validators.required]
      ),
      harz: new FormControl(this.data.resin_name ? this.data.resin_name : "", [
        Validators.required
      ]),
      dueDate: new FormControl(this.data.due_date ? this.data.due_date : "", [
        Validators.required
      ]),
      priority: new FormControl(this.data.priority ? this.data.priority : "", [
        Validators.required
      ]),
      creationDate: new FormControl(
        this.data.creation_date ? this.data.creation_date : "",
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
        this.fileInputScan.nativeElement?
        this.fileInputScan.nativeElement
          : null
         ,[Validators.required])
       
  
    });

    if (this.data.customer_id)
      this.customer_name = this.customerData.find(
        customer => customer.customer_id == this.data.customer_id
      ).name;

    this.fileToUploadName = this.data.file_scan_name ? this.data.file_scan_name : "";
  }

  onQuit(): void {
    this.dialogRef.close();
  }
  uploadScan() {
    console.log("uploadScan");

    // if (fi.files && fi.files[0]) {
    //   let fileToUpload = fi.files[0];
    //   this.uploadService.uploadScan(fileToUpload, 17).subscribe(res => {
    //     console.log(res);
    //   });
    // }
  }

  onDeleteButton(): void {
    this.backendService
      .removeOrderById(this.data.order_id)
      .then(response => console.log("onDeleteButton", response));
    this.dialogRef.close();
  }

  onSaveButton(): void {
    let formData = this.newOrderForm.value;

    let newOrder = new FormData();
    newOrder.append("customer_id", formData.customer_id ? formData.customer_id : this.data.customer_id);
    newOrder.append("patient", formData.patient);
    newOrder.append("dental_print_type", formData.dental_print_type);
    newOrder.append("resin_name", formData.harz);
    newOrder.append("due_date", formData.dueDate);
    newOrder.append("comment", formData.comment);
    newOrder.append("status", this.data.status);
    newOrder.append("scan_file", formData.hochladen.files[0]);

    // newOrder.forEach(value=>console.log("order: ", value))
    //OLD test above then delete below
    // let alteredOrderData = {
    //   customer_id: this.data.customer_id,
    //   patient: formData.patient,
    //   dental_print_type: formData.dental_print_type,
    //   resin_name: formData.harz,
    //   due_date: formData.dueDate ? formData.dueDate : this.data.due_date,
    //   comment: formData.comment,
    //   status: this.data.status
    // };
    this.backendService
      .alterOrderById(this.data.order_id, newOrder)
      .then(response => console.log("alterOrderById", response));
    // console.log(alteredOrderData);
    // this.dialogRef.close({order_id : this.data.order_id, alteredOrder : alteredOrderData});
    this.dialogRef.close();
  }
  handleFileInput(files: FileList){
    this.fileToUploadName = files.item(0).name;
  }
}
