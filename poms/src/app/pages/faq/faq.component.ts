import { IHelpPage, IHelpPageTopic, IHelpPageSubtopic } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material';
import { PopUpFAQComponent } from 'src/app/components/pop-up-faq/pop-up-faq.component';

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FAQComponent implements OnInit {
  allHelpTopics: Array<IHelpPage>;
  newFaq: String;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.backendService
      .getAllHelpTopics()
      .then(
        (newHelpTopics: Array<IHelpPage>) =>
          (this.allHelpTopics = newHelpTopics)
      );
  }
  onClick(subtopic: {
    subtopicTitel: String;
    subtopicContent: String;
    videoURL?: String;
  }) {
    console.log(subtopic);
  }

  addNewTopic(topic: IHelpPageTopic){
    let newSubtopic: IHelpPageSubtopic = {subtopicTitel: "newSubTitel", subtopicContent: "newSubtopicContent"};
    this.backendService.addNewSubtopic(topic, newSubtopic);
  }
  openPopUpFaq(): void {
    const dialogRef = this.dialog.open(PopUpFAQComponent, {
      data: { newFaqForm: this.newFaq }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newFaq = result;
      if (result) this.addNewTopic(result.data);
    });
  }
}
