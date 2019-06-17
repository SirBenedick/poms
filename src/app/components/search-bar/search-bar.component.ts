import {
  IOrder,
  ISingleSearchResult,
  IPrinterData,
  ICustomer,
  IFAQPageSearchResult
} from "src/app/shared/interfaces";
import { ISearchResults } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material";
import Swal from "sweetalert2";
import { CreateNewOrderComponent } from "../pop-ups/create-new-order/create-new-order.component";
import { UrlTextPopUpComponent } from "../pop-ups/url-text-pop-up/url-text-pop-up.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  filteredResultOptions: Observable<any>;
  customerData: Array<ICustomer> = this.backendService.customerData;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    /** SearchBarComponent initializes before backend has pulled data */
    setTimeout(
      () => (this.customerData = this.backendService.customerData),
      1000
    );
    /** If within 300ms there has been no additional input the search is triggered */
    this.filteredResultOptions = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(searchValue =>
        this.backendService.getSearchResults(searchValue)
      ),
      map((searchResult: ISearchResults) => {
        let toBeDisplayedResults: Array<ISingleSearchResult> = [];
        /** Iterates over every Object and fills toBeDisplayedResults */
        /** Handles order search results  */
        if (searchResult.order) {
          searchResult.order.forEach((order: IOrder) => {
            /** Maps customer_id result to customer_name */
            let customer_name = this.customerData.find(
              customer => customer.customer_id == order.customer_id
            ).name;
            let singleSearchResult: ISingleSearchResult = {
              img_src: "../../../assets/svg/searchbar/order.svg",
              result: `Zahnarzt: ${customer_name}`,
              result_small: `#${order.order_id}`,
              original_object: order
            };
            toBeDisplayedResults.push(singleSearchResult);
          });
        }
        /** Handles printer search results  */
        if (searchResult.printer) {
          searchResult.printer.forEach((printer: IPrinterData) => {
            let singleSearchResult: ISingleSearchResult = {
              img_src: "../../../assets/svg/searchbar/printer.svg",
              result: `${printer.name}`,
              result_small: `ID: ${printer.printer_id}`,
              original_object: printer
            };
            toBeDisplayedResults.push(singleSearchResult);
          });
        }
        /** Handles faq_entry search results  */
        if (searchResult.faq_entry) {
          searchResult.faq_entry.forEach((faq_entry: IFAQPageSearchResult) => {
            let singleSearchResult: ISingleSearchResult = {
              img_src: "../../../assets/svg/searchbar/help.svg",
              result: `${faq_entry.title}`,
              result_small: `${faq_entry.sub_category}`,
              original_object: faq_entry
            };
            toBeDisplayedResults.push(singleSearchResult);
          });
        }

        return toBeDisplayedResults;
      })
    );
  }

  onOptionClicked(option: ISingleSearchResult) {
    if (option.img_src.includes("order")) {
      this.openDialogCreateNewOrder(option.original_object);
    } else if (option.img_src.includes("printer")) {
      this.router.navigate(["/printer"]);
    } else if (option.img_src.includes("help")) {
      this.openUrlTextPopUp(<IFAQPageSearchResult>option.original_object);
    }
  }

  openDialogCreateNewOrder(data?: any): void {
    let dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          let order = result.value;
          let newOrder = new FormData();
          newOrder.append("customer_id", order.customer_id);
          newOrder.append("patient", order.patient);
          newOrder.append("dental_print_type", order.dental_print_type);
          newOrder.append("resin_name", order.harz);
          newOrder.append("due_date", order.due_date);
          newOrder.append("comment", order.comment);
          newOrder.append("status", "created");
          newOrder.append("scan_file", order.hochladen.files[0]);

          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              Swal.fire({
                title: "Fehler!",
                text: res.error,
                confirmButtonText: "Verstanden",
                confirmButtonColor: "#62c6d6",
                background: "url(../assets/svg/FehlerPopUp.svg)"
              });
              console.log("createNewOrder Error: ", res.error);
              this.openDialogCreateNewOrder(order);
            } else {
              console.log("createNewOrder Response: ", res);
            }
          });
        }
      }
    });
  }

  openUrlTextPopUp(faq_entry: IFAQPageSearchResult): void {
    let createData = {
      item: faq_entry,
      category: faq_entry.category,
      subcategory: faq_entry.sub_category
    };
    const dialogRef = this.dialog.open(UrlTextPopUpComponent, {
      data: createData
    });
  }
}
