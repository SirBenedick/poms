import { Component, OnInit } from "@angular/core";

import { BackendService } from './../../services/backend.service';
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
  constructor(private backendService: BackendService) {}

  ngOnInit() {

  }
  orderList = [
    { orderId: "1", dueDate: "09.05.2019", priority: "hoch" },
    { orderId: "2", dueDate: "09.05.2019", priority: "niedrig" }
  ];
  allGroupedOrders = [
    {
      groupId: 1,
      orderCardsByGroup: [
        { orderId: "111", dueDate: "09.05.2019", priority: "niedrig" },
        { orderId: "112", dueDate: "09.05.2019", priority: "niedrig" }
      ]
    },
    {
      groupId: 2,
      orderCardsByGroup: [
        { orderId: "222", dueDate: "09.05.2019", priority: "niedrig" }
      ]
    }
  ];
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
