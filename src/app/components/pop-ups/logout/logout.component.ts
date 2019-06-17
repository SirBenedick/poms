import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,

  ) { }

  ngOnInit() {
  }

  onOkClick():void{
    this.dialogRef.close();
 
  }
}
