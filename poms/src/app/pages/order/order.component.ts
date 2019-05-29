import { ConverterService } from './../../services/converter.service';
import { IOrderCreateNew } from "./../../shared/interfaces";
import { Component, OnInit, Input } from "@angular/core";
import { BackendService } from "../../services/backend.service";
import {
  IOrder,
  IFilterOrders,
  IGroupedOrders
} from "src/app/shared/interfaces";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { OrderFilterPopupComponent } from "src/app/components/order-filter-popup/order-filter-popup.component";
import { PopUpNeuerDruckerComponent } from "src/app/components/pop-up-neuer-drucker/pop-up-neuer-drucker.component";
import { PopUpDruckenComponent } from "src/app/components/pop-up-drucken/pop-up-drucken.component";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<IGroupedOrders> = [];
  newOrder: String; //no data use ATM

  filteredUngroupedOrders: Array<IOrder> = [];
  filteredGroupData: Array<IGroupedOrders> = [];

  isOrderFilterSet: number = 0;
  isGroupFilterSet: number = 0;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private converter: ConverterService
  ) {}

  ngOnInit() {
    this.backendService
      .getAllGroups()
      .then((resopnse: Array<IGroupedOrders>) => {
        this.allGroupedOrders = resopnse;
        this.filteredGroupData = this.allGroupedOrders;
      });

    //** First time POMS is loaded "this.backendService.allUngroupedOrders" is still empty*/
    if (this.backendService.allUngroupedOrders.length == 0) {
      this.backendService
        .pollAllOrdersFromBackend()
        .toPromise()
        .then((allOrderData: Array<IOrder>) => {
          let convertedOrders: Array<IOrder> = this.converter.ordersBackendToFrontend(allOrderData);
          this.sortOrderLists(convertedOrders);
          // this.sortOrderLists(this.backendService.allUngroupedOrders);
        });
    } else {
      this.sortOrderLists(this.backendService.allUngroupedOrders);
    }
  }

  sortOrderLists(allOrdersUnsorted: Array<IOrder>) {
    allOrdersUnsorted.forEach(singleOrder => {
      //check if groupId exists
      if (singleOrder.groupId) {
        //returns item with corresponding singleOrder.groupId or undefinded
        let foundGroupObject = this.allGroupedOrders.find(
          item => item.groupId === singleOrder.groupId
        );
        //if group already exists add singleOrder to existing orderCardsByGroup else add group with singleOrder
        if (foundGroupObject) {
          foundGroupObject.orders.push(singleOrder);
        } else {
          // console.log("Keine Gruppe vorhanden: ", foundGroupObject);
        }
      } else {
        this.allUngroupedOrders.push(singleOrder);
      }
    });
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.filteredGroupData = this.allGroupedOrders;
  }

  filterUngroupedOrders(parameter: IFilterOrders) {
    this.resetOrderFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "dueDate") {
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
  filterGroupData(parameter: IFilterOrders) {
    this.resetGroupFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "dueDate") {
          // console.log("Filter DueDate, does nothing");
        } else {
          this.filteredGroupData = this.filteredGroupData.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }

  resetOrderFilter() {
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    this.isOrderFilterSet = 0;
    event.stopPropagation();
  }
  resetGroupFilter() {
    this.filteredGroupData = this.allGroupedOrders;
    this.isGroupFilterSet = 0;
    event.stopPropagation();
  }

  openDialogCreateNewOrder(): void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: { newPrinterForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          let order = result.value;
          let newOrder: IOrderCreateNew = {
            customer_id: parseInt(order.customer),
            patient: order.patient,
            dental_print_type: order.dentalPrintType,
            resin_name: order.harz,
            due_date: order.dueDate,
            comment: order.comment,
            status: "created",
            scan_file: null
          };
          this.backendService
            .createNewOrder(newOrder)
            .then(res => console.log(res));
        }
      }
    });
  }

  openDialogFilterOrders(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterUngroupedOrders(result.data);
        this.isOrderFilterSet = this.numberOfFilterParameters(result.data);
      }
    });
  }
  openDialogFilterGroups(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterGroupData(result.data);

        this.isGroupFilterSet = this.numberOfFilterParameters(result.data);
      }
    });
  }

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
  onPrintClick(): void {
    const dialogRef = this.dialog.open(PopUpDruckenComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.filterGroupData(result.data);
    });
  }

  onDelete(): void {
    console.log("Delete");
  }
  //Bitte lesen:
  //Kann ja dann eigentlich weg oder? Wird ja per Drag&Drop gemacht??
  newGroup(): void {
    console.log("New Group");
  }

  dropNewGroup(event: CdkDragDrop<string[]>) {
    console.log("dropNewGroup");
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );

    //BAckend Call create new group with order
    // BE Erhält call + order id --> muss groupId anpassen
    //then refresh page

    this.backendService.createNewGroup(draggedOrder).then(res => {
      console.log("response:", res);
      this.sortOrderLists(this.backendService.allUngroupedOrders);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );
    let targetContainer = event.container;
    let targetDataLink: Array<IOrder> = <Array<IOrder>>(
      (<unknown>targetContainer.data)
    );
    let targetContainerNodeType =
      targetContainer.element.nativeElement.nodeName;

    // console.log("draggedOrder", draggedOrder);
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
    }
    //** Abglech ob Harzfarbe passt */
    else if (targetDataLink[0].harz === draggedOrder.harz) {
      transferArrayItem(
        previousContainer.data,
        targetContainer.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      /** Fehler muss ersichtlich ausgegeben sein */
      alert(
        `Der Auftrag #${draggedOrder.orderId} hat den Harztyp: ${
          draggedOrder.harz
        }.
Die Gruppe jedoch ${targetDataLink[0].harz}`
      );
    }
  }
}
