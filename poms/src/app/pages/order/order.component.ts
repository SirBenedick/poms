import { Component, OnInit } from "@angular/core";
import { BackendService } from "./../../services/backend.service";
import { IOrder } from "src/app/shared/interfaces";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { async } from "q";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<any> = [];
  newOrder: String;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //** First time page is loaded "this.backendService.allUngroupedOrders" is still empty*/
    if (
      this.allUngroupedOrders.length == 0 &&
      this.allGroupedOrders.length == 0
    ) {
      // setTimeout hat seinen eigenen scope und würde "this" anders zuordnen
      var that = this;
      setTimeout(function() {
        that.sortOrderLists(that.backendService.allUngroupedOrders);
      }, 300);
    }
    this.sortOrderLists(this.backendService.allUngroupedOrders);
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
          foundGroupObject.orderCardsByGroup.push(singleOrder);
        } else {
          this.allGroupedOrders.push({
            groupId: singleOrder.groupId,
            orderCardsByGroup: [singleOrder]
          });
        }
      } else {
        this.allUngroupedOrders.push(singleOrder);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let previousContainer = event.previousContainer;
    let draggedOrder: IOrder = <IOrder>(
      (<unknown>previousContainer.data[event.previousIndex])
    );
    let targetContainer = event.container;
    let targetContainerNodeType =
      targetContainer.element.nativeElement.nodeName;

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
    else if (targetContainer.data.length < 3) {
      transferArrayItem(
        previousContainer.data,
        targetContainer.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      /** Fehler muss ersichtlich ausgegeben sein */
      console.log("Blocked");
      alert("Es befinden sich bereits 3 Aufträge in der Gruppe!\n Bitte eine neue Gruppe anlegen.");
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.newOrder = result;
    });
  }

  onClick(): void {
    console.log("Files to Printer");
  }

  onDelete(): void {
    console.log("Delete");
  }

  newGroup(): void {
    console.log("New Group");
  }
}
