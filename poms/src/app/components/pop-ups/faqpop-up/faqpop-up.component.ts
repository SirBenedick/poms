import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FAQComponent } from 'src/app/pages/faq/faq.component';

@Component({
  selector: 'app-faqpop-up',
  templateUrl: './faqpop-up.component.html',
  styleUrls: ['./faqpop-up.component.css']
})
export class FAQPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FAQComponent>
  ) { }

  ngOnInit() {
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
