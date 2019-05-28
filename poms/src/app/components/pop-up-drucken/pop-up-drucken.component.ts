import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderComponent } from 'src/app/pages/order/order.component';
import { IDrucken } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pop-up-drucken',
  templateUrl: './pop-up-drucken.component.html',
  styleUrls: ['./pop-up-drucken.component.css']
})
export class PopUpDruckenComponent implements OnInit {
  newPrinterForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDrucken,
    public dialogRef: MatDialogRef<OrderComponent>
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
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

  onButtonClick():void{
    console.log("Button is clicked")
  }
}
