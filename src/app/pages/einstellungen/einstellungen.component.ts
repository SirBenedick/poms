import { Component, OnInit, Inject } from "@angular/core";
import { ISettingsPage, IFAQPage } from "src/app/shared/interfaces";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { NeuerKundeComponent } from "src/app/components/pop-ups/Settings/neuer-kunde/neuer-kunde.component";
import { NeuesHarzComponent } from "src/app/components/pop-ups/Settings/neues-harz/neues-harz.component";
import { NeueKategorieComponent } from "src/app/components/pop-ups/Settings/neue-kategorie/neue-kategorie.component";
import { KundeninfobearbeitenComponent } from "src/app/components/pop-ups/Settings/kundeninfobearbeiten/kundeninfobearbeiten.component";
import { KundeloeschenComponent } from "src/app/components/pop-ups/Settings/kundeloeschen/kundeloeschen.component";
import { KategorieinfobearbeitenComponent } from "src/app/components/pop-ups/Settings/kategorieinfobearbeiten/kategorieinfobearbeiten.component";
import { KategorieloeschenComponent } from "src/app/components/pop-ups/Settings/kategorieloeschen/kategorieloeschen.component";
import { HarzinfobearbeitenComponent } from "src/app/components/pop-ups/Settings/harzinfobearbeiten/harzinfobearbeiten.component";
import { HarzloeschenComponent } from "src/app/components/pop-ups/Settings/harzloeschen/harzloeschen.component";
import Swal from "sweetalert2";
@Component({
  selector: "app-einstellungen",
  templateUrl: "./einstellungen.component.html",
  styleUrls: ["./einstellungen.component.css"]
})
export class EinstellungenComponent implements OnInit {
  allSettingsTopics: Array<ISettingsPage> = [
    {
      pageTitel: "Verwaltung",
      topics: [
        {
          topicTitel: "Kunden verwalten",
          subtopics: [
            {
              subtopicTitel: "Kunde hinzufügen",
              subtopicContent: "subtopicContent 111"
            },
            {
              subtopicTitel: "Kunde bearbeiten",
              subtopicContent: "subtopicContent 112"
            },
            {
              subtopicTitel: "Kunde löschen",
              subtopicContent: "subtopicContent 112"
            }
          ]
        },
        {
          topicTitel: "Kategorien verwalten",
          subtopics: [
            {
              subtopicTitel: "Kategorie hinzufügen",
              subtopicContent: "subtopicContent 121"
            },
            {
              subtopicTitel: "Kategorie bearbeiten",
              subtopicContent: "subtopicContent 122"
            },
            {
              subtopicTitel: " Kategorie löschen",
              subtopicContent: "subtopicContent 122"
            }
          ]
        },
        {
          topicTitel: " Harze verwalten",
          subtopics: [
            {
              subtopicTitel: "Harz hinzufügen",
              subtopicContent: "subtopicContent 121"
            },
            {
              subtopicTitel: " Harz bearbeiten",
              subtopicContent: "subtopicContent 122"
            },
            {
              subtopicTitel: " Harz löschen",
              subtopicContent: "subtopicContent 122"
            }
          ]
        }
      ]
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFAQPage,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}
  onClick(subtopic: { subtopicTitel: string; subtopicContent: string }) {
    if (subtopic.subtopicTitel == "Kunde hinzufügen") {
      this.dialog.open(NeuerKundeComponent, {});
    } else if (subtopic.subtopicTitel == "Kategorie hinzufügen") {
      this.dialog.open(NeueKategorieComponent, {});
    } else if (subtopic.subtopicTitel == "Harz hinzufügen") {
      this.dialog.open(NeuesHarzComponent, {});
    } else if (subtopic.subtopicTitel == "Kunde bearbeiten") {
      this.dialog.open(KundeninfobearbeitenComponent, {});
    } else if (subtopic.subtopicTitel == "Kunde löschen") {
      this.dialog.open(KundeloeschenComponent, {});
    } else if (subtopic.subtopicTitel == "Kategorie bearbeiten") {
      this.dialog.open(KategorieinfobearbeitenComponent, {});
    } else if (subtopic.subtopicTitel == " Kategorie löschen") {
      this.dialog.open(KategorieloeschenComponent, {});
    } else if (subtopic.subtopicTitel == " Harz bearbeiten") {
      this.dialog.open(HarzinfobearbeitenComponent, {});
    } else if (subtopic.subtopicTitel == " Harz löschen") {
      this.dialog.open(HarzloeschenComponent, {});
    } else {
      Swal.fire({
        title: "Fehler!",
        text: "Für diese Aktion ist noch kein Pop-Up vorhanden!",
        confirmButtonText: "Verstanden",

        background: "url(../assets/svg/FehlerPopUp.svg)"
      });
    }
  }
}
