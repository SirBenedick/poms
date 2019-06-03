import { ConverterService } from "./../../services/converter.service";
import { IOrderCreateNew } from "./../../shared/interfaces";
import { Component, OnInit } from "@angular/core";
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
import { PopUpDruckenComponent } from "src/app/components/pop-up-drucken/pop-up-drucken.component";
import { ErrorPopUpComponent } from "src/app/components/error-pop-up/error-pop-up.component";
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
  filterParameterOrder: IFilterOrders;
  filterParameterGroup: IFilterOrders;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private converter: ConverterService
  ) {}

  ngOnInit() {
    this.backendService
      .getAllGroups()
      .then((response: Array<IGroupedOrders>) => {
        this.allGroupedOrders = response;
        this.filteredGroupData = this.allGroupedOrders;
        console.log("Groups: ", response);
      });

    //** First time POMS is loaded "this.backendService.allUngroupedOrders" is still empty*/
    if (this.backendService.allUngroupedOrders.length == 0) {
      this.backendService
        .pollAllOrdersFromBackend()
        .toPromise()
        .then((allOrderData: Array<IOrder>) => {
          // let convertedOrders: Array<
          //   IOrder
          // > = this.converter.ordersBackendToFrontend(allOrderData);
          // this.sortOrderLists(convertedOrders);
          this.sortOrderLists(allOrderData);
          this.backendService.allUngroupedOrders = allOrderData;
          // this.sortOrderLists(this.backendService.allUngroupedOrders);
          // this.sortOrderLists(allOrderData);
          console.log("orders: ", allOrderData);
        });
    } else {
      this.sortOrderLists(this.backendService.allUngroupedOrders);
    }
  }

  sortOrderLists(allOrdersUnsorted: Array<IOrder>) {
    //old version, first we filtered the grouped orders out
    // allOrdersUnsorted.forEach(singleOrder => {
    //   //check if group_id exists
    //   if (singleOrder.group_id) {
    //     //returns item with corresponding singleOrder.group_id or undefinded
    //     let foundGroupObject = this.allGroupedOrders.find(
    //       item => item.group_id === singleOrder.group_id
    //     );
    //     //if group already exists add singleOrder to existing orderCardsByGroup else add group with singleOrder
    //     if (foundGroupObject) {
    //       foundGroupObject.orders.push(singleOrder);
    //       console.log("pushed group");
    //     } else {
    //       console.log("Keine Gruppe vorhanden: ", foundGroupObject);
    //     }
    //   } else {
    //     this.allUngroupedOrders.push(singleOrder);
    //   }
    // });
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

  filterUngroupedOrders(parameter: IFilterOrders) {
    console.log("Filter params: ", parameter);
    console.log("filteredUngrouped", this.filteredUngroupedOrders);
    this.resetOrderFilter();

    for (let key in parameter) {
      console.log(key);
      if (parameter[key]) {
        if (key == "due_date") {
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
            order => {
              let orderDate = new Date(order[key]);
              console.log(order[key]);
              if (
                parameter[key].start <= orderDate &&
                orderDate <= parameter[key].end
              ) {
                console.log("time", order);
                return true;
              }
            }
          );
        } else {
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
            order => {
              console.log(order[key] == parameter[key]);
              return order[key] == parameter[key];
            }
          );
        }
        console.log(
          "after key: ",
          key + ":" + this.filteredUngroupedOrders.length
        );
      }
    }
  }
  filterGroupData(parameter: IFilterOrders) {
    this.resetGroupFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "due_date") {
          // console.log("Filter DueDate, does nothing");
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
    event.stopPropagation();
    this.filterParameterOrder = null;
  }

  resetGroupFilter() {
    this.filteredGroupData = this.allGroupedOrders;
    this.isGroupFilterSet = 0;
    event.stopPropagation();
    this.filterParameterGroup = null;
  }

  openDialogCreateNewOrder(): void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: { newPrinterForm: "Keine Auswahl getroffen" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          let order = result.value;
          console.log(result.value);
          let newOrder: IOrderCreateNew = {
            customer_id: parseInt(order.customer),
            patient: order.patient,
            dental_print_type: order.dental_print_type,
            resin_name: order.harz,
            due_date: order.dueDate,
            comment: order.comment,
            status: "created",
            scan_file: order.hochladen.files[0]
          };
          console.log(newOrder);
          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              alert(res.error);
              console.log(res.error);
            } else {
              console.log(res);
            }
            //ggf müssen hier alle aufträge neugeladen/angezeigt werden
            //bei in order.ts und basic-layout.ts
          });
        }
      }
    });
  }
  openDialogFilterOrders(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
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
      data: { newOrderForm: this.newOrder }
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

  onPrintClick(): void {
    const dialogRef = this.dialog.open(PopUpDruckenComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.filterGroupData(result.data);
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

  dropNewGroup(event: CdkDragDrop<string[]>) {
    console.log("dropNewGroup");
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );

    //BAckend Call create new group with order
    // BE Erhält call + order id --> muss group_id anpassen
    //then refresh page

    this.backendService.createNewGroup(draggedOrder).then(res => {
      console.log("response:", res);
      // this.sortOrderLists(this.backendService.allUngroupedOrders);
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
    
    console.log("previous index: ", event.previousIndex)
    console.log("previous container: ", previousContainer.data)
    console.log("draggedOrder", draggedOrder);
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
      console.log(draggedOrder);
      this.backendService
        .assignOrderToGroup(draggedOrder.order_id, noGroup)
        .then(res => console.log(res));
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
      console.log(
        "firstItemFromGroup.resin_name: ",
        firstItemFromGroup.resin_name
      );
      console.log("draggedOrder.resin_name: ", draggedOrder);
      /** Fehler muss ersichtlich ausgegeben sein */
      this.dialog.open(ErrorPopUpComponent);
      // alert(
      //     `Der Auftrag #${draggedOrder.order_id} hat den Harztyp: ${
      //           draggedOrder.harz
      //         }.
      // Die Gruppe jedoch ${targetDataLink[0].harz}`
      // );
    }
    // Hier die Abfrage ob die Gruppe leer ist und dann wird sie gelöscht
    this.deleteEmptyGroup();
  }
  deleteEmptyGroup() {
    this.allGroupedOrders.forEach(group => {
      if (group.orders.length == 0)
        this.backendService.removeGroupById(group.group_id);
    });
  }
}
