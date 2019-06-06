import { Component, OnInit } from "@angular/core";
import {
  IOrder,
  IFilterOrders,
  IGroupedOrders
} from "src/app/shared/interfaces";
import { BackendService } from "src/app/services/backend.service";
import { MatDialog } from "@angular/material";
import { OrderFilterPopupComponent } from "src/app/components/order-filter-popup/order-filter-popup.component";
import { FAQComponent } from "../faq/faq.component";

@Component({
  selector: "app-printedorders",
  templateUrl: "./printedorders.component.html",
  styleUrls: ["./printedorders.component.css"]
})
export class PrintedordersComponent implements OnInit {
  allUnsentOrders: Array<IOrder> = [];
  allSentOrders: Array<any> = [];

  filteredUnsentOrders: Array<IOrder> = [];
  filteredSentOrders: Array<IGroupedOrders> = [];
  
  filterParameterOrder: IFilterOrders;
  filterParameterGroup: IFilterOrders;
  isUnsentFilterSet: number = 0;
  isSentFilterSet: number = 0;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.backendService.allUngroupedOrders.length == 0) {
      this.loadOrderData();
    } else {
      this.sortOrderLists(this.backendService.allUngroupedOrders);
    }
  }
  loadOrderData() {
    console.log("loadOrderData");
    this.backendService
      .pollAllOrdersFromBackend()
      .toPromise()
      .then((allOrderData: Array<IOrder>) => {
        this.allUnsentOrders = [];
        this.sortOrderLists(allOrderData);
        this.backendService.allUngroupedOrders = allOrderData;
      });
  }
  //show all ReadyOrders
  sortOrderLists(allReadyUnsorted: Array<IOrder>) {
    //Search all Orders
    allReadyUnsorted.forEach(singleReady => {
      //If Status===created, push the singleReady into the array
      if (
        singleReady.status === "postPrint" ||
        singleReady.status === "cleaned" ||
        singleReady.status === "postExposure"
      ) {
        this.allUnsentOrders.push(singleReady);
      } else if (singleReady.status === "sent") {
        this.allSentOrders.push(singleReady);
      }
    });
    //for filter, with this the filter is accept
    this.filteredUnsentOrders = this.allUnsentOrders;
    this.filteredSentOrders = this.allSentOrders;
  }

  openUnsentFilter(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: "newOrder" }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterUnsentOrders(filterParamter);
        // Anzeige wie viele Filter aktiv sind
        this.isUnsentFilterSet = this.numberOfFilterParameters(filterParamter);
        this.filterParameterOrder = filterParamter;
      }
    });
  }

  openSentFilter(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: "newOrder" }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterSentOrders(filterParamter);
        // Anzeige wie viele Filter aktiv sind
        this.isSentFilterSet = this.numberOfFilterParameters(filterParamter);
        this.filterParameterGroup = filterParamter;
      }
    });
  }
  filterUnsentOrders(parameter: IFilterOrders) {
    this.resetUnsentFilter();
    console.log(this.allSentOrders)
    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          this.filteredUnsentOrders = this.filteredUnsentOrders.filter(
            order => {
              let orderDate = new Date(order[key]);
              if (
                parameter[key].start <= orderDate &&
                orderDate <= parameter[key].end
              )
                return true;
            }
          );
        } else {
          this.filteredUnsentOrders = this.filteredUnsentOrders.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }
  filterSentOrders(parameter: IFilterOrders) {
    this.resetSentFilter();
    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          this.filteredSentOrders = this.filteredSentOrders.filter(order => {
            let orderDate = new Date(order[key]);
            if (
              parameter[key].start <= orderDate &&
              orderDate <= parameter[key].end
            )
              return true;
          });
        } else {
          this.filteredSentOrders = this.filteredSentOrders.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }
  // Anzahl der Filter berechnen, wie viele Aktiv sind
  numberOfFilterParameters(parameter: IFilterOrders): number {
    let setParamters: number = 0;
    let maxTimeForDateCreation = 8640000000000000;

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "dueDate") {
          if (new Date("2019-01-01") < parameter[key].start) {
            setParamters++;
          }
          if (parameter[key].end < new Date(maxTimeForDateCreation)) {
            setParamters++;
          }
        } else {
          setParamters++;
        }
      }
    }
    return setParamters;
  }

  resetUnsentFilter() {
    this.filteredUnsentOrders = this.allUnsentOrders;
    this.isUnsentFilterSet = 0;
    event.stopPropagation();
    this.filterParameterOrder = null;
  }

  resetSentFilter() {
    this.filteredSentOrders = this.allSentOrders;
    this.isSentFilterSet = 0;
    event.stopPropagation();
    this.filterParameterGroup = null;
  }

  help(): void {
    this.dialog.open(FAQComponent);
  }
}
