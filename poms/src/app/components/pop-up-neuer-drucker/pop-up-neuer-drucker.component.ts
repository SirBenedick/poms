import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IPrinter } from 'src/app/shared/interfaces';
import { PrinterComponent } from 'src/app/pages/printer/printer.component';

@Component({
  selector: 'app-pop-up-neuer-drucker',
  templateUrl: './pop-up-neuer-drucker.component.html',
  styleUrls: ['./pop-up-neuer-drucker.component.css']
})
export class PopUpNeuerDruckerComponent implements OnInit {

  newPrinterForm: FormGroup;
  constructor(  
    @Inject(MAT_DIALOG_DATA) public data: IPrinter,
    public dialogRef: MatDialogRef<PrinterComponent>) { }

  ngOnInit() {
    this.newPrinterForm = new FormGroup({
      printerId: new FormControl(this.data.printerId ? this.data.printerId : "", [
        Validators.minLength(1),
        Validators.required
      ]),
      printerName: new FormControl(this.data.printerId ? this.data.printerId : "", [
        Validators.minLength(1),
        Validators.required
      ]),
    })
  }


  onBreakButton(){
    console.log("Abbruch")

  }
  onSaveButton(){
    console.log("Drucker wurde gespeichert")
   this.dialogRef.close();
  }
}
