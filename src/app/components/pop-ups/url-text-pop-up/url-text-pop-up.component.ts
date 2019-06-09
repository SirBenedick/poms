import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FAQPopUpComponent } from "../faqpop-up/faqpop-up.component";
import { BackendService } from "src/app/services/backend.service";
import { IFAQPageAlter } from 'src/app/shared/interfaces';


@Component({
  selector: "app-url-text-pop-up",
  templateUrl: "./url-text-pop-up.component.html",
  styleUrls: ["./url-text-pop-up.component.css"]
})
export class UrlTextPopUpComponent implements OnInit {
  bearbeitenAktiv: boolean = false;
  oldTitle: string;

  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<FAQPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
      category: any;
      subcategory: any;
    }
  ) {}

  ngOnInit() {
    this.oldTitle = this.data.item.title;
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

  bearbeitenButton(): void {
    this.bearbeitenAktiv = true;
  }

  saveButton(): void {
    this.bearbeitenAktiv = false;
    let alteredSubtopic: IFAQPageAlter = {
      category: this.data.category,
      sub_category: this.data.subcategory,
      title: this.oldTitle,
      new_category: this.data.category,
      new_sub_category: this.data.subcategory,
      new_title: this.data.item.title,
      video_url: this.data.item.video_url,
      content: this.data.item.content
    };
    this.backendService
      .alterFAQ(alteredSubtopic)
      .then(response => console.log("alterFAQ", response));
  }
}
