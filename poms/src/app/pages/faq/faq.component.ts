import { IHelpPage, IHelpPageTopic, IHelpPageSubtopic } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FAQComponent implements OnInit {
  allHelpTopics: Array<IHelpPage>;

  constructor(private backendService: BackendService) {}

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
}
