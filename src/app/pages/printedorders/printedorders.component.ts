import { Component, OnInit } from "@angular/core";
import {
  IOrder,
  IFilterOrders,
  IGroupedOrders
} from "src/app/shared/interfaces";
import { BackendService } from "src/app/services/backend.service";
import { MatDialog } from "@angular/material";
import { OrderFilterPopupComponent } from "src/app/components/pop-ups/order-filter-popup/order-filter-popup.component";
import { FAQComponent } from "../faq/faq.component";
import { PostprintGroupActionComponent } from "src/app/components/pop-ups/postprint-group-action/postprint-group-action.component";

@Component({
  selector: "app-printedorders",
  templateUrl: "./printedorders.component.html",
  styleUrls: ["./printedorders.component.css"]
})
export class PrintedordersComponent implements OnInit {
  allSentOrders: Array<any> = [];
  allGroupedOrders: Array<IGroupedOrders> = [];

  filteredSentOrders: Array<IGroupedOrders> = [];
  filteredGroupData: Array<IGroupedOrders> = [];

  filterParameterOrder: IFilterOrders;
  filterParameterGroup: IFilterOrders;
  isSentFilterSet: number = 0;
  isGroupFilterSet: number = 0;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //** First time POMS is loaded "this.backendService.allUngroupedOrders" might still be empty*/
    if (this.backendService.allGroupData.length == 0) {
      this.loadGroupData();
    } else {
      this.refreshAllGroupData(this.backendService.allGroupData);
    }

    if (this.backendService.allUngroupedOrders.length == 0) {
      this.loadOrderData();
    } else {
      this.sortOrderLists(this.backendService.allUngroupedOrders);
    }
  }

  loadGroupData() {
    this.backendService
      .getAllGroups()
      .toPromise()
      .then((allGroupData: Array<IGroupedOrders>) => {
        this.refreshAllGroupData(allGroupData);
      });
  }
  refreshAllGroupData(newData: Array<IGroupedOrders>) {
    this.allGroupedOrders = [];
    newData.forEach((group: IGroupedOrders) => {
      if (group.status == "preprint") this.allGroupedOrders.push(group);
    });
    this.filteredGroupData = this.allGroupedOrders;
  }

  loadOrderData() {
    console.log("loadOrderData");
    this.backendService
      .pollAllOrdersFromBackend()
      .toPromise()
      .then((allOrderData: Array<IOrder>) => {
        this.sortOrderLists(allOrderData);
        this.backendService.allUngroupedOrders = allOrderData;
      });
  }

  sortOrderLists(allReadyUnsorted: Array<IOrder>) {
    allReadyUnsorted.forEach(singleReady => {
      if (singleReady.status === "sent") {
        this.allSentOrders.push(singleReady);
      }
    });
    this.filteredSentOrders = this.allSentOrders;
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
  openDialogFilterGroups(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: "newOrder" }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterGroupData(filterParamter);
        this.isGroupFilterSet = this.numberOfFilterParameters(filterParamter);
        this.filterParameterGroup = filterParamter;
      }
    });
  }
  filterGroupData(parameter: IFilterOrders) {
    this.resetGroupFilter();

    for (const key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          // Groups can not be filtered by "due_date"
        } else {
          this.filteredGroupData = this.filteredGroupData.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }
  resetGroupFilter() {
    this.filteredGroupData = this.allGroupedOrders;
    this.isGroupFilterSet = 0;
    event.stopPropagation(); //two (click) events on html tags, google it
    this.filterParameterGroup = null;
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
        if (key == "due_date") {
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

  resetSentFilter() {
    this.filteredSentOrders = this.allSentOrders;
    this.isSentFilterSet = 0;
    event.stopPropagation();
    this.filterParameterGroup = null;
  }

  help(): void {
    this.dialog.open(FAQComponent);
  }

  onGroupClick(group: IGroupedOrders): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PostprintGroupActionComponent, {
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.filterGroupData(result.data);
    });
  }
}
