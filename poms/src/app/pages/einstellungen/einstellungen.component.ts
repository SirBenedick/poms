import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { ISettingsPage, ISettingsPageSubtopic } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.css']
})
export class EinstellungenComponent implements OnInit {
  allSettingsTopics: Array<ISettingsPage>;
  constructor(private backendService: BackendService) { }

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
