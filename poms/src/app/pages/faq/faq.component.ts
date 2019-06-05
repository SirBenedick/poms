// import { IHelpPage, IHelpPageTopic, IHelpPageSubtopic } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { PopUpFAQComponent } from "src/app/components/pop-up-faq/pop-up-faq.component";
import { FAQPopUpComponent } from "src/app/components/faqpop-up/faqpop-up.component";
import { UrlTextPopUpComponent } from "src/app/components/url-text-pop-up/url-text-pop-up.component";
import { IFAQPage, ICategory, IResinType } from "src/app/shared/interfaces";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FAQComponent implements OnInit {
  helpData: any = this.backendService.helpData;
  categoryData: Array<ICategory> = this.backendService.mockedCategoryData;
  item: any;
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}
  onClick(subtopic: {
    subtopicTitel: String;
    subtopicContent: String;
    videoURL?: String;
  }) {
    console.log(subtopic);
  }

  // addNewTopic(topic: IFAQPage){
  //   let newSubtopic: IFAQPage = {subtopicTitel: "newSubTitel", subtopicContent: "newSubtopicContent"};
  //   this.backendService.addNewSubtopic(topic, newSubtopic);
  // }

  openFAQPopUp(): void {
    const dialogRef = this.dialog.open(FAQPopUpComponent);
    console.log("PopUp Hilfestellung");
  }

  openUrlTextPopUp(item, category, subcategory): void {
    // console.log("item", item)
    // console.log("category", category)
    // console.log("subcategory", subcategory)
    let createData = {
      item: item,
      category: category,
      subcategory: subcategory
    };
    const dialogRef = this.dialog.open(UrlTextPopUpComponent, {
      data: createData
    });
  }

  createNewFaq(category, subcategory): void {
    const dialogRef = this.dialog.open(PopUpFAQComponent, {
      data: {
        category: category,
        subcategory: subcategory,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) this.addNewTopic(result.data);
    });
  }
}
