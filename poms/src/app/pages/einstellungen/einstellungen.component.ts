import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "src/app/services/backend.service";
import {
  ISettingsPage,
  IFAQPage,
} from "src/app/shared/interfaces";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { NeuerKundeComponent } from "src/app/Pop-Ups/Settings/neuer-kunde/neuer-kunde.component";
import { NeuesHarzComponent } from 'src/app/Pop-Ups/Settings/neues-harz/neues-harz.component';
import { NeueKategorieComponent } from 'src/app/Pop-Ups/Settings/neue-kategorie/neue-kategorie.component';
import { KundeninfobearbeitenComponent } from 'src/app/Pop-Ups/Settings/kundeninfobearbeiten/kundeninfobearbeiten.component';
import { KundeloeschenComponent } from 'src/app/Pop-Ups/Settings/kundeloeschen/kundeloeschen.component';
import { KategorieinfobearbeitenComponent } from 'src/app/Pop-Ups/Settings/kategorieinfobearbeiten/kategorieinfobearbeiten.component';
import { KategorieloeschenComponent } from 'src/app/Pop-Ups/Settings/kategorieloeschen/kategorieloeschen.component';
import { HarzinfobearbeitenComponent } from 'src/app/Pop-Ups/Settings/harzinfobearbeiten/harzinfobearbeiten.component';
import { HarzloeschenComponent } from 'src/app/Pop-Ups/Settings/harzloeschen/harzloeschen.component';

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
     this.dialog.open(NeuerKundeComponent, {});
    }
    else if(subtopic.subtopicTitel == "Eine Kategorie hinzufügen") {
      this.dialog.open(NeueKategorieComponent, {});
    }
    else if(subtopic.subtopicTitel == "Ein Harz hinzufügen") {
      this.dialog.open(NeuesHarzComponent, {});
    }
    else if(subtopic.subtopicTitel == "Kundeninformation bearbeiten"){
      this.dialog.open(KundeninfobearbeitenComponent, {});
    }
    else if(subtopic.subtopicTitel == "Bestehende Kunden entfernen"){
      this.dialog.open(KundeloeschenComponent, {});
    }
    else if(subtopic.subtopicTitel == "Kategorieinformation bearbeiten"){
      this.dialog.open(KategorieinfobearbeitenComponent, {});
    }
    else if(subtopic.subtopicTitel == " Bestehende Kategorie entfernen"){
      this.dialog.open(KategorieloeschenComponent, {});
    }
    else if(subtopic.subtopicTitel == " Harzinformationen bearbeiten"){
      this.dialog.open(HarzinfobearbeitenComponent, {});
    }
    else if(subtopic.subtopicTitel == " Bestehende Harze entfernen"){
      this.dialog.open(HarzloeschenComponent, {});
    }
    else{
      alert(`Für die Priorität ist noch kein Pop-Up vorhanden!`)
    }
  }

}
