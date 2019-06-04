import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FAQComponent } from "src/app/pages/faq/faq.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IFAQPage } from 'src/app/shared/interfaces';
// import { IHelpPageSubtopic } from "src/app/shared/interfaces";

@Component({
  selector: "app-pop-up-faq",
  templateUrl: "./pop-up-faq.component.html",
  styleUrls: ["./pop-up-faq.component.css"]
})
export class PopUpFAQComponent implements OnInit {
  newFaqForm: FormGroup;

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: IFAQPage,
    public dialogRef: MatDialogRef<FAQComponent>
  ) {}

  ngOnInit() {
     this.newFaqForm = new FormGroup({
       titel: new FormControl(
         this.data.category ? this.data : "",
         [Validators.minLength(1), Validators.required]
       ),
       content: new FormControl(
         this.data.category ? this.data : "",
         [Validators.minLength(1), Validators.required]
       ),
       videoURL: new FormControl(),
        // videoURL: new FormControl(this.data.videoURL ? this.data.videoURL : "", [
        //   Validators.minLength(1),
        //   Validators.required
        // ]),
    });
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
