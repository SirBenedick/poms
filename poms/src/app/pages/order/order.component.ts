import { Component, OnInit } from "@angular/core";

import { BackendService } from "./../../services/backend.service";
import { IOrder } from "src/app/shared/interfaces";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { OrderCardComponent } from 'src/app/components/order-card/order-card.component';
import { MatDialog } from '@angular/material';
import { CreateNewOrderComponent } from 'src/app/components/create-new-order/create-new-order.component';
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<any> = [];

  constructor(private backendService: BackendService, public dialog: MatDialog) {}

  ngOnInit() {
    this.backendService
      .getAllOrders()
      .then((allOrdersResponse: Array<IOrder>) => {
        this.sortOrderLists(allOrdersResponse);
      });
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
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  openDialog():void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent);

     dialogRef.afterClosed().subscribe(result =>{
      console.log("The dialog was closed");
    });

  }

}
