import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { PopUpFAQComponent } from "src/app/components/pop-ups/pop-up-faq/pop-up-faq.component";
import { UrlTextPopUpComponent } from "src/app/components/pop-ups/url-text-pop-up/url-text-pop-up.component";
import { ICategory } from "src/app/shared/interfaces";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FAQComponent implements OnInit {
  helpData: any = this.backendService.helpData;
  categoryData: Array<ICategory> = this.backendService.categoriesData;
  item: any;
  
  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  onClick(subtopic: {
    subtopicTitel: string;
    subtopicContent: string;
    videoURL?: string;
  }) {
    console.log(subtopic);
  }

  openUrlTextPopUp(item, category, subcategory): void {
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
        subcategory: subcategory
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
