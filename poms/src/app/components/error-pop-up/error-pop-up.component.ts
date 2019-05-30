import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OrderComponent } from 'src/app/pages/order/order.component';

@Component({
  selector: 'app-error-pop-up',
  templateUrl: './error-pop-up.component.html',
  styleUrls: ['./error-pop-up.component.css']
})
export class ErrorPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderComponent>) { }

  ngOnInit() {
  }

  verstanden():void {
      this.dialogRef.close();
    }
  }
