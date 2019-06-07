import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FAQComponent } from "src/app/pages/faq/faq.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { BackendService } from "src/app/services/backend.service";
import { IFAQPageCreate } from 'src/app/shared/interfaces';
// import { IHelpPageSubtopic } from "src/app/shared/interfaces";

@Component({
  selector: "app-pop-up-faq",
  templateUrl: "./pop-up-faq.component.html",
  styleUrls: ["./pop-up-faq.component.css"]
})
export class PopUpFAQComponent implements OnInit {
  newTitle: string;
  newContent: string;
  newVideourl: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      category: { key };
      subcategory: { key };
    },
    public dialogRef: MatDialogRef<FAQComponent>,
    private backendService: BackendService
  ) {}

  ngOnInit() {}

  onBreakButton(): void {
    this.dialogRef.close();
  }

  onSaveButton(): void {
    console.log(this.data);
     let createFaq: IFAQPageCreate ={
       category: this.data.category.key,
       sub_category: this.data.subcategory.key,
       title: this.newTitle,
       video_url: this.newVideourl,
       content: this.newContent,
  }
  console.log(createFaq)
   this.backendService
   .createFAQ(createFaq)
   .then(response => console.log("createFaq", response));
 }
}
