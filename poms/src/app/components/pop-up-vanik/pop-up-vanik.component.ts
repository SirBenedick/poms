import { Component, OnInit, Inject, Input } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StatusComponent } from '../status/status.component';
import { IPrinterData } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-pop-up-vanik',
  templateUrl: './pop-up-vanik.component.html',
  styleUrls: ['./pop-up-vanik.component.css']
})
export class PopUpVanikComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<StatusComponent>) { }

  ngOnInit() {
  }

  onBreakButton():void{
    this.dialogRef.close();
  }
}
