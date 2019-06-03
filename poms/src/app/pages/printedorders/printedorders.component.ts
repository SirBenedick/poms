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
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<IGroupedOrders> = [];
  allReadyOrders: Array<any> = [];
  filteredUngroupedOrders: Array<IOrder> = [];
  filteredGroupData: Array<IGroupedOrders> = [];
  newOrder: String;
  filterParameterOrder: IFilterOrders;
  filterParameterGroup: IFilterOrders;
  isOrderFilterSet: number = 0;
  isGroupFilterSet: number = 0;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    if (this.backendService.allUngroupedOrders.length == 0) {
      this.loadOrderData();
    } else {
      this.readyOrders(this.backendService.allUngroupedOrders);
    }
  }
  loadOrderData() {
    console.log("loadOrderData");
    this.backendService
      .pollAllOrdersFromBackend()
      .toPromise()
      .then((allOrderData: Array<IOrder>) => {
        this.allUngroupedOrders = [];
        this.readyOrders(allOrderData);
        this.backendService.allUngroupedOrders = allOrderData;
      });
  }
  //show all ReadyOrders
  readyOrders(allReadyUnsorted: Array<IOrder>) {
    //Search all Orders
    allReadyUnsorted.forEach(singleReady => {
      //If Status===created, push the singleReady into the array
      if (singleReady.status === "created") {
        this.allUngroupedOrders.push(singleReady);
      } else {
        //push the singleReady into a new array
        this.allReadyOrders.push(singleReady);
      }
    });
    //for filter, with this the filter is accept
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.filteredGroupData = this.allReadyOrders;
  }

  openPostProcessing(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterPostProcessing(filterParamter);
        // Anzeige wie viele Filter aktiv sind
        // this.isOrderFilterSet = this.numberOfFilterParameters(filterParamter);
        // this.filterParameterOrder = filterParamter;
      }
    });
  }

  openFinishedFilter(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterFinishedData(filterParamter);
        // Anzeige wie viele Filter aktiv sind
        // this.isGroupFilterSet = this.numberOfFilterParameters(filterParamter);
        // this.filterParameterGroup = filterParamter;
      }
    });
  }
  filterPostProcessing(parameter: IFilterOrders) {
    this.resetOrderFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
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
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }
  filterFinishedData(parameter: IFilterOrders) {
    this.resetFinishedFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          this.allReadyOrders = this.allReadyOrders.filter(order => {
            let orderDate = new Date(order[key]);
            if (
              parameter[key].start <= orderDate &&
              orderDate <= parameter[key].end
            )
              return true;
          });
        } else {
          this.allReadyOrders = this.allReadyOrders.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }
  // Anzahl der Filter berechnen, wie viele Aktiv sind
  // numberOfFilterParameters(parameter: IFilterOrders): number {
  //   let setParamters: number = 0;
  //   let maxTimeForDateCreation = 8640000000000000;

  //   for (let key in parameter) {
  //     if (parameter[key]) {
  //       if (key == "dueDate") {
  //         if (new Date("2019-01-01") < parameter[key].start) {
  //           setParamters++;
  //         }
  //         if (parameter[key].end < new Date(maxTimeForDateCreation)) {
  //           setParamters++;
  //         }
  //       } else {
  //         setParamters++;
  //       }
  //     }
  //   }
  //   return setParamters;
  // }

  resetOrderFilter() {
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.isOrderFilterSet = 0;
    event.stopPropagation();
    this.filterParameterOrder = null;
  }

  resetFinishedFilter() {
    this.allReadyOrders = this.filteredGroupData;
    this.isGroupFilterSet = 0;
    event.stopPropagation();
    this.filterParameterGroup = null;
  }

  help(): void {
    this.dialog.open(FAQComponent);
  }
}
