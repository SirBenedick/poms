import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FAQPopUpComponent } from '../faqpop-up/faqpop-up.component';

@Component({
  selector: 'app-url-text-pop-up',
  templateUrl: './url-text-pop-up.component.html',
  styleUrls: ['./url-text-pop-up.component.css']
})
export class UrlTextPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FAQPopUpComponent>
  ) { }

  ngOnInit() {
  }

  onBreakButton():void{
    this.dialogRef.close();
  }
}
