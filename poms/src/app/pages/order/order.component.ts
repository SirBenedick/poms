import { Component, OnInit } from "@angular/core";

import { BackendService } from "./../../services/backend.service";
import { IOrder } from "src/app/shared/interfaces";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  allUngroupedOrders: Array<IOrder> = [];
  allGroupedOrders: Array<any> = [];

  constructor(private backendService: BackendService) {}

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
}
