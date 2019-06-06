import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "src/app/services/backend.service";
import {
  ISettingsPage,
  IFAQPage,
  ISettingsPageSubtopic
} from "src/app/shared/interfaces";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { NeuerKundeComponent } from "src/app/Pop-Ups/Settings/neuer-kunde/neuer-kunde.component";
import { NeuesHarzComponent } from 'src/app/Pop-Ups/Settings/neues-harz/neues-harz.component';
import { NeueKategorieComponent } from 'src/app/Pop-Ups/Settings/neue-kategorie/neue-kategorie.component';

@Component({
  selector: "app-einstellungen",
  templateUrl: "./einstellungen.component.html",
  styleUrls: ["./einstellungen.component.css"]
})
export class EinstellungenComponent implements OnInit {
  allSettingsTopics: Array<ISettingsPage>;
  // settingsData: any = this.backendService.settingsData;
  constructor(
    private backendService: BackendService,
    @Inject(MAT_DIALOG_DATA) public data: IFAQPage,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.backendService
      .getAllSettingTopics()
      .then(
        (newSettingsTopics: Array<ISettingsPage>) =>
          (this.allSettingsTopics = newSettingsTopics)
      );
  }
  onClick(subtopic: { subtopicTitel: String; subtopicContent: String }) {
    if (subtopic.subtopicTitel == "Einen Kunden hinzufügen") {
      const dialogRef = this.dialog.open(NeuerKundeComponent, {});
    }
    if(subtopic.subtopicTitel == "Eine Kategorie hinzufügen") {
      const dialogReg = this.dialog.open(NeueKategorieComponent, {});
    }
    if(subtopic.subtopicTitel == "Ein Harz hinzufügen") {
      const dialogReg = this.dialog.open(NeuesHarzComponent, {});
    }
  }

  // addNewTopic(topic: ISettingsPage) {
  //   let newSubtopic: ISettingsPageSubtopic = {
  //     subtopicTitel: "newSubTitel",
  //     subtopicContent: "newSubtopicContent"
  //   };
  //   this.backendService.addNewSettingSubtopic(topic, newSubtopic);
  // }

}
