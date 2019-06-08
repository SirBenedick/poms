import { UploadService } from "../../../services/upload.service";
import { Component, OnInit, Inject, Input, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderComponent } from "src/app/pages/order/order.component";
import { IPrinterData } from "src/app/shared/interfaces";
import { BackendService } from "src/app/services/backend.service";


@Component({
  selector: "app-pop-up-drucken",
  templateUrl: "./pop-up-drucken.component.html",
  styleUrls: ["./pop-up-drucken.component.css"]
})
export class PopUpDruckenComponent implements OnInit {
  newPrinterForm: FormGroup;
  printerData: Array<IPrinterData> = this.backendService.allPrinterData;
  downloadProgress;

  @ViewChild("fileInputSkin") fileInputSkin;
  @ViewChild("fileInputSolid") fileInputSolid;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderComponent>,
    private backendService: BackendService,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.newPrinterForm = new FormGroup({
      // Kann in der Regel auch leer sein
      hochladen: new FormControl(),
      herunterladen: new FormControl(),
      drucker: new FormControl(),
      EMail: new FormControl(this.data.EMail ? this.data.EMail : "", [
        Validators.minLength(1),
        Validators.required
      ])
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
  onPrintButton(): void {
    // //Für Den richtigen druck
    console.log("onPrintButton");
    let fi = this.fileInputSkin.nativeElement;
    console.log(fi.files[0]);

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService.uploadScan(fileToUpload, 17).subscribe(res => {
        console.log(res);
      });
    }
    this.dialogRef.close();
  }
  downloadSkin() {
    console.log("Nothing");
  }
  uploadSolid() {
    console.log("Nothing");
  }
}
