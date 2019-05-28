import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FAQComponent } from "src/app/pages/faq/faq.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IHelpPageSubtopic } from "src/app/shared/interfaces";

@Component({
  selector: "app-pop-up-faq",
  templateUrl: "./pop-up-faq.component.html",
  styleUrls: ["./pop-up-faq.component.css"]
})
export class PopUpFAQComponent implements OnInit {
  newFaqForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IHelpPageSubtopic,
    public dialogRef: MatDialogRef<FAQComponent>
  ) {}

  ngOnInit() {
    this.newFaqForm = new FormGroup({
      subtopicTitel: new FormControl(
        this.data.subtopicTitel ? this.data.subtopicTitel : "",
        [Validators.minLength(1), Validators.required]
      ),
      subtopicContent: new FormControl(
        this.data.subtopicContent ? this.data.subtopicContent : "",
        [Validators.minLength(1), Validators.required]
      ),
      videoURL: new FormControl()
      //  videoURL: new FormControl(this.data.videoURL ? this.data.videoURL : "", [
      //    Validators.minLength(1),
      //    Validators.required
      //  ]),
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
