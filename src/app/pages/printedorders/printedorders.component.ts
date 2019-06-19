import { Component, OnInit } from "@angular/core";
import {
  IOrder,
  IFilterOrders,
  IGroupedOrders,
  IResinType
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
  /** Is used to reset the "filtered...Data" */
  allSentOrders: Array<any> = [];
  allPostPrintOrders: Array<any> = [];
  allGroupedOrders: Array<IGroupedOrders> = [];

  /** "filtered...Data" is dsiplayed to user */
  filteredSentOrders: Array<IGroupedOrders> = [];
  filteredGroupData: Array<IGroupedOrders> = [];
  /** "filterParameter..." are saved for copying filter from group to order and viceversa */
  filterParameterOrder: IFilterOrders;
  filterParameterGroup: IFilterOrders;
  /** "is...FilterSet" controlls the "appFilterButtonActivated" directive */
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
      if (group.status == "postPrint") {
        this.allGroupedOrders.push(group);
      }
    });
    this.filteredGroupData = this.allGroupedOrders;
  }

  loadOrderData() {
    this.backendService
      .getAllOrders()
      .toPromise()
      .then((allOrderData: Array<IOrder>) => {
        this.allSentOrders = [];
        this.sortOrderLists(allOrderData);
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

  filterSentOrders(parameter: IFilterOrders) {
    this.resetSentOrderFilter();
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

  resetGroupFilter() {
    this.filteredGroupData = this.allGroupedOrders;
    this.isGroupFilterSet = 0;
    event.stopPropagation(); //two (click) events on html tags, google it
    this.filterParameterGroup = null;
  }

  resetSentOrderFilter() {
    this.filteredSentOrders = this.allSentOrders;
    this.isSentFilterSet = 0;
    event.stopPropagation();
    this.filterParameterGroup = null;
  }

  /** Calculates number of active filter */
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

  help(): void {
    this.dialog.open(FAQComponent);
  }

  onGroupClick(group: IGroupedOrders): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PostprintGroupActionComponent, {
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.result == "refresh") {
        this.loadGroupData();
        this.loadOrderData();
      }
    });
  }

  getResineColorValue(resine_name: string) {
    return this.backendService.resineData.find(
      (harz: IResinType) => harz.resin_name == resine_name
    ).color;
  }

  copyResinFromGroup(group: IGroupedOrders) {
    event.stopPropagation();
    let tempFilter = {
      resin_name: group.resin_name,
      priority: null,
      due_date: null,
      customer_id: null
    };

    this.filterGroupData(tempFilter);
    this.isGroupFilterSet = this.numberOfFilterParameters(tempFilter);
    this.filterParameterGroup = tempFilter;
  }
}
