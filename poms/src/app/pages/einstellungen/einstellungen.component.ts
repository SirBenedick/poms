import { Component, OnInit, Inject } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ISettingsPage, IFAQPage, ISettingsPageSubtopic } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.css']
})
export class EinstellungenComponent implements OnInit {
  allSettingsTopics: Array<ISettingsPage>;
  // settingsData: any = this.backendService.settingsData;
  constructor(private backendService: BackendService,
  @Inject(MAT_DIALOG_DATA) public data: IFAQPage,) { }

  ngOnInit() {
     this.backendService
     .getAllSettingTopics()
     .then(
       (newSettingsTopics: Array<ISettingsPage>) =>
         (this.allSettingsTopics = newSettingsTopics)
     );
  }
  onClick(subtopic: {
    subtopicTitel: String;
    subtopicContent: String;
  }) {
    console.log(subtopic);
  }

   addNewTopic(topic: ISettingsPage){
     let newSubtopic: ISettingsPageSubtopic = {subtopicTitel: "newSubTitel", subtopicContent: "newSubtopicContent"};
     this.backendService.addNewSettingSubtopic(topic, newSubtopic);
   }

}
