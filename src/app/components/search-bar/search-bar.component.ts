import {
  IOrder,
  ISingleSearchResult,
  IPrinterData,
  IFAQPage,
  ICustomer
} from "src/app/shared/interfaces";
import { ISearchResults } from "./../../shared/interfaces";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, startWith, switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent implements OnInit {
  public searchControl: FormControl;
  filteredResultOptions: Observable<any>;
  customerData: Array<ICustomer> = this.backendService.customerData;

  mockedOptions: Array<ISingleSearchResult>;

  constructor(private backendService: BackendService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
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
        if (searchResult.order) {
          searchResult.order.forEach((order: IOrder) => {
            let customer_name = this.customerData.find(
              customer => customer.customer_id == order.customer_id
            ).name;
            let singleSearchResult: ISingleSearchResult = {
              img_src: "../../../assets/svg/searchbar/order.svg",
              result_small: `#${order.order_id}`,
              result: `Zahnarzt: ${customer_name}`
            };
            toBeDisplayedResults.push(singleSearchResult);
          });
        }
        // if (searchResult.printer) {
        //   searchResult.printer.forEach((printer: IPrinterData) => {
        //     let singleSearchResult: ISingleSearchResult = {
        //       img_src: "../../../assets/svg/searchbar/order.svg",
        //       result: `Auftrag: ${order.order_id}`
        //     };
        //     toBeDisplayedResults.push(singleSearchResult);
        //   });
        // }
        // if (searchResult.faq_entry) {
        //   searchResult.faq_entry.forEach((faq_entry: IFAQPage) => {
        //     let singleSearchResult: ISingleSearchResult = {
        //       img_src: "../../../assets/svg/searchbar/order.svg",
        //       result: `Auftrag: ${order.order_id}`
        //     };
        //     toBeDisplayedResults.push(singleSearchResult);
        //   });
        // }

        return toBeDisplayedResults;
      })
    );
  }

  onOptionClicked(option) {
    console.log("Clicked: ", option);
  }
}
