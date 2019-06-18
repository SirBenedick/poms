import { UploadService } from "../../../services/upload.service";
import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderComponent } from "src/app/pages/order/order.component";
import { IPrinterData, IGroupedOrders } from "src/app/shared/interfaces";
import { BackendService } from "src/app/services/backend.service";
import Swal from "sweetalert2";
import { take } from "rxjs/operators";

@Component({
  selector: "app-pop-up-drucken",
  templateUrl: "./pop-up-drucken.component.html",
  styleUrls: ["./pop-up-drucken.component.css"]
})
export class PopUpDruckenComponent implements OnInit {
  newPrinterForm: FormGroup;
  printerData: Array<IPrinterData> = this.backendService.allPrinterData;
  uploadProgress: number = 0;
  noPrinterAvailable: boolean = true;

  @ViewChild("fileInputSliced") fileInputSliced;
  /** Gets displayed in .html */
  fileToUploadName: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IGroupedOrders,
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
      EMail: new FormControl("", [Validators.minLength(6), Validators.required])
    });

    this.checkIfThereAreAvailiblePrinter();
  }

  checkIfThereAreAvailiblePrinter() {
    this.printerData.forEach(printer => {
      if (printer.is_printing == 0 && printer.offline == 0) {
        this.noPrinterAvailable = false;
      }
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
  onPrintButton(): void {
    let groupId: number = this.data.group_id;
    let selectedPrinterId: number = this.newPrinterForm.get("drucker").value;
    let selctedEmail: string = this.newPrinterForm.get("EMail").value;

    this.backendService
      .getPrinterById(selectedPrinterId)
      .pipe(take(1))
      .subscribe((printer: IPrinterData) => {
        if (printer.maintenance_required == 1) {
          Swal.fire({
            title: "Fehler!",
            text:
              "Der Drucker scheint nicht druckbereit zu sein. \n Dennoch Druck starten?",
            cancelButtonText: "Abbrechen",
            confirmButtonText: "Verstanden",
            showCancelButton: true,
            background: "url(../assets/svg/FehlerPopUp.svg)"
          }).then(res => {
            if (res.value) {
              this.assignGroupToPrinterAndStartPrint(
                groupId,
                selectedPrinterId,
                selctedEmail
              );
            }
          });
        } else {
          this.assignGroupToPrinterAndStartPrint(
            groupId,
            selectedPrinterId,
            selctedEmail
          );
        }
      });
    //
  }

  assignGroupToPrinterAndStartPrint(
    groupId: number,
    selectedPrinterId: number,
    selctedEmail: string
  ) {
    this.backendService
      .assignGroupToPrinterAndStartPrint(
        groupId,
        selectedPrinterId,
        selctedEmail
      )
      .then(response => {
        console.log("assignGroupToPrinterAndStartPrint :", response);
        if (response["error"])
          Swal.fire({
            title: "Fehler!",
            text: "Bitte alle Informationen angeben: \n" + response["error"],
            confirmButtonText: "Verstanden",
            background: "url(../assets/svg/FehlerPopUp.svg)"
          });
      });
    this.dialogRef.close();
  }

  downloadSolidFiles() {
    this.backendService.downloadSolidFilesFromGroup(
      this.data.group_id,
      `Skins_for_group_id_${this.data.group_id}`
    );
  }
  uploadSlicedFile() {
    let fi = this.fileInputSliced.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.uploadService
        .uploadSlicedToGroup(this.data.group_id, fileToUpload)
        .subscribe(res => {
          if (res["status"] == "progress") this.uploadProgress = res["message"];
        });
    } else {
      Swal.fire({
        title: "Fehler!",
        text: "Bitte Datei auswählen!",
        confirmButtonText: "Verstanden",
        
        background: "url(../assets/svg/FehlerPopUp.svg)"
      });
    }
  }
  handleFileInput(files: FileList) {
    this.fileToUploadName = files.item(0).name;
  }
}
