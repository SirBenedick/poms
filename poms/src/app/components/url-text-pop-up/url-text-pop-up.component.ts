import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FAQPopUpComponent } from '../faqpop-up/faqpop-up.component';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';
// import { IHelpPageSubtopic } from 'src/app/shared/interfaces';
import { BackendService } from 'src/app/services/backend.service';
import { IFAQPage } from 'src/app/shared/interfaces';
import { FAQComponent } from 'src/app/pages/faq/faq.component';

@Component({
  selector: 'app-url-text-pop-up',
  templateUrl: './url-text-pop-up.component.html',
  styleUrls: ['./url-text-pop-up.component.css']
})
export class UrlTextPopUpComponent implements OnInit {
  bearbeitenAktiv: boolean = false;

  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<FAQPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FAQComponent,
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  onBreakButton():void{
    this.dialogRef.close();
  }
 
  bearbeitenButton():void{
    this.bearbeitenAktiv = true;
  }

  saveButton():void{
    this.bearbeitenAktiv = false;  
    // Muss noch ausgefüllt werden
    //  let alteredSubtopic: IFAQPage = {
     
    //  }
    //  this.backendService.createFAQ(null, alteredSubtopic);
  }

}
