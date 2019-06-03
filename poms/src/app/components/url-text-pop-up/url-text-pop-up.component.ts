import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FAQPopUpComponent } from '../faqpop-up/faqpop-up.component';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';
import { IHelpPageSubtopic } from 'src/app/shared/interfaces';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-url-text-pop-up',
  templateUrl: './url-text-pop-up.component.html',
  styleUrls: ['./url-text-pop-up.component.css']
})
export class UrlTextPopUpComponent implements OnInit {
  bearbeitenAktiv: boolean = false;
  subtopicTitel: string = `Hier kann IHR FAQ stehen!`;
  videoURL: string = `../../../assets/png/FAQ_temp_pic.jpg `
  subtopicContent: string =
  `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
  invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
  et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
  dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<FAQPopUpComponent>
  ) { }

  ngOnInit() {
  }

  onBreakButton():void{
    this.dialogRef.close();
  }
 
  bearbeitenButton():void{
    this.bearbeitenAktiv = true;
  }

  saveButton():void{
    this.bearbeitenAktiv = false;  
    let alteredSubtopic: IHelpPageSubtopic = {
      subtopicTitel : this.subtopicTitel,
      videoURL : this.videoURL,
      subtopicContent : this.subtopicContent,
    }
    this.backendService.addNewSubtopic(null, alteredSubtopic);
  }

}
