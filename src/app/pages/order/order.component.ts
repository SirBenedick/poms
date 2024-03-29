import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import {
  IOrder,
  IFilterOrders,
  IGroupedOrders,
  IResinType
} from "src/app/shared/interfaces";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/pop-ups/create-new-order/create-new-order.component";
import { OrderFilterPopupComponent } from "src/app/components/pop-ups/order-filter-popup/order-filter-popup.component";
import { PopUpDruckenComponent } from "src/app/components/pop-ups/pop-up-drucken/pop-up-drucken.component";
import Swal from "sweetalert2";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  /** Saves all data, doesnt get changed, is used to reset the "filtered...Data"
   * ungrouped orders = orders which are not included in any group
   */
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<IGroupedOrders> = [];

  /** "filtered...Data" is dsiplayed to user */
  filteredUngroupedOrders: Array<IOrder> = [];
  filteredGroupData: Array<IGroupedOrders> = [];
  /** "is...FilterSet" controlls the "appFilterButtonActivated" directive */
  isOrderFilterSet: number = 0;
  isGroupFilterSet: number = 0;
  /** "filterParameter..." are saved for copying filter from group to order and viceversa */
  filterParameterOrder: IFilterOrders = {
    resin_name: null,
    priority: null,
    due_date: null,
    customer_id: null
  };
  filterParameterGroup: IFilterOrders = {
    resin_name: null,
    priority: null,
    due_date: null,
    customer_id: null
  };

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
      this.sortAllOrdersByStatus(this.backendService.allUngroupedOrders);
    }
  }

  /** Datahandling functions */
  loadGroupData() {
    this.backendService
      .getAllGroups()
      .toPromise()
      .then((allGroupData: Array<IGroupedOrders>) => {
        this.refreshAllGroupData(allGroupData);
      });
  }

  loadOrderData() {
    this.backendService
      .getAllOrders()
      .toPromise()
      .then((allOrderData: Array<IOrder>) => {
        this.allUngroupedOrders = [];
        this.sortAllOrdersByStatus(allOrderData);
        this.resetOrderFilter();
      });
  }

  refreshAllGroupData(newData: Array<IGroupedOrders>) {
    this.allGroupedOrders = [];
    newData.forEach((group: IGroupedOrders) => {
      if (group.status != "postPrint" && group.status != "sent")
        this.allGroupedOrders.push(group);
    });
    this.filteredGroupData = this.allGroupedOrders;
  }

  /** Handles incoming orders and only forwards orders with status "created" or "isSolid" */
  sortAllOrdersByStatus(allOrdersUnsorted: Array<IOrder>) {
    allOrdersUnsorted.forEach(singleOrder => {
      if (singleOrder.group_id == 0 || singleOrder.group_id == null) {
        if (
          singleOrder.status == "created" ||
          singleOrder.status == "isSolid"
        ) {
          this.allUngroupedOrders.push(singleOrder);
        }
      }
    });
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.filteredGroupData = this.allGroupedOrders;
  }

  /** Filters all ungrouped orders, by parameter */
  filterUngroupedOrders(parameter: IFilterOrders) {
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
              ) {
                return true;
              }
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

  /** Event functions */
  resetOrderFilter() {
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.isOrderFilterSet = 0;
    if (event) event.stopPropagation(); //two (click) events on html tags, google it
    this.filterParameterOrder = null;
  }

  resetGroupFilter() {
    this.filteredGroupData = this.allGroupedOrders;
    this.isGroupFilterSet = 0;
    event.stopPropagation(); //two (click) events on html tags, google it
    this.filterParameterGroup = null;
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
          newOrder.append("comment", order.comment + " ");
          newOrder.append("status", "created");
          newOrder.append("scan_file", order.hochladen.files[0]);

          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              Swal.fire({
                title: "Fehler!",
                text: res.error,
                confirmButtonText: "Verstanden",

                background: "url(../assets/svg/FehlerPopUp.svg)"
              });
              console.log("createNewOrder Error: ", res.error);
              this.openDialogCreateNewOrder(order);
            } else {
              console.log("createNewOrder Response: ", res);
              this.loadOrderData();
            }
          });
        }
      }
    });
  }

  openDialogFilterOrders(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: "newOrder" }
    });

    dialogRef.afterClosed().subscribe((result: { data: IFilterOrders }) => {
      if (result) {
        let filterParamter = result.data;
        this.filterUngroupedOrders(filterParamter);
        this.isOrderFilterSet = this.numberOfFilterParameters(filterParamter);
        this.filterParameterOrder = filterParamter;
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

  onPrintClick(group: IGroupedOrders): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PopUpDruckenComponent, {
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterGroupData(result.data);
      }
      setTimeout(() => this.loadGroupData(), 1000);
    });
  }

  copyOrderFilterToGroup(): void {
    this.filterGroupData(this.filterParameterOrder);
    this.isGroupFilterSet = this.numberOfFilterParameters(
      this.filterParameterOrder
    );
  }

  copyGroupFilterToOrder(): void {
    this.filterUngroupedOrders(this.filterParameterGroup);
    this.isOrderFilterSet = this.numberOfFilterParameters(
      this.filterParameterGroup
    );
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

  dropNewGroup(event: CdkDragDrop<string[]>) {
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );

    this.backendService.createNewGroup(draggedOrder).then(res => {
      this.loadGroupData();
      this.loadOrderData();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );
    let targetContainer = event.container;
    let targetDataLink: Array<any> = <Array<IOrder>>(
      (<unknown>targetContainer.data)
    );
    let firstItemFromGroup: any = targetDataLink[0];
    let targetContainerNodeType =
      targetContainer.element.nativeElement.nodeName;
    let noGroup: number = 0;

    if (previousContainer === targetContainer) {
      moveItemInArray(
        targetContainer.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (targetContainerNodeType === "DIV") {
      transferArrayItem(
        previousContainer.data,
        targetContainer.data,
        event.previousIndex,
        event.currentIndex
      );
      this.backendService
        .assignOrderToGroup(draggedOrder.order_id, noGroup)
        .then(res => console.log("assignOrderToGroup: ", res));
    }
    //** Abglech ob Harzfarbe passt */
    else if (firstItemFromGroup.resin_name === draggedOrder.resin_name) {
      transferArrayItem(
        previousContainer.data,
        targetContainer.data,
        event.previousIndex,
        event.currentIndex
      );

      this.backendService.assignOrderToGroup(
        draggedOrder.order_id,
        firstItemFromGroup.group_id
      );
    } else {
      Swal.fire({
        title: "Fehler!",
        text:
          "Der Auftrag kann nicht in der Gruppe zugewiesen werden, weil die Harzfarbe des Auftrags und der Gruppe nicht übereinstimmen. Bitte ordne den Auftrag einer anderen Gruppe zu.",
        confirmButtonText: "Verstanden",

        background: "url(../assets/svg/FehlerPopUp.svg)"
      });
    }
    this.deleteEmptyGroup();
  }

  deleteEmptyGroup() {
    this.allGroupedOrders.forEach(group => {
      if (group.orders.length == 0) {
        this.backendService.removeGroupById(group.group_id);
        this.loadGroupData();
      }
    });
  }
  getResineColorValue(resine_name: string) {
    return this.backendService.resineData.find(
      (harz: IResinType) => harz.resin_name == resine_name
    ).color;
  }
}
