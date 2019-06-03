import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderComponent } from 'src/app/pages/order/order.component';
import { IDrucken, IPrinterData } from 'src/app/shared/interfaces';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-pop-up-drucken',
  templateUrl: './pop-up-drucken.component.html',
  styleUrls: ['./pop-up-drucken.component.css']
})
export class PopUpDruckenComponent implements OnInit {
  newPrinterForm: FormGroup;
  printerData: Array<IPrinterData> = this.backendService.mockedPrinterData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderComponent>,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    this.newPrinterForm = new FormGroup({
    //   hochladen: new FormControl(
    //     this.data.download ? this.data.download : "",
    //     [Validators.minLength(1), Validators.required]
    //   ),
    //   herunterladen: new FormControl(
    //     this.data.upload ? this.data.upload : "",
    //     [Validators.minLength(1), Validators.required]
    //   ),
    //   drucker: new FormControl(
    //     this.data.print ? this.data.print : "",
    //     [Validators.minLength(1), Validators.required]
    //   ),
    // });
    // Kann in der Regel auch leer sein
      hochladen: new FormControl(),
      herunterladen: new FormControl(),
      drucker: new FormControl(),
      EMail: new FormControl(
        this.data.EMail ? this.data.EMail: "",
        [Validators.minLength(1), Validators.required]
      ),
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

  onButtonClick():void{
    console.log("Button is clicked")
  }
}
