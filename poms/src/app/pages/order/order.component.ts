import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  groupedList=[
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "166", dueDate: "09.05.2019", priority: "hoch",},
  ];
  orderList = [
    {orderId: "1", dueDate: "09.05.2019", priority: "hoch",},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    {orderId: "2", dueDate: "09.05.2019", priority: "niedrig"},
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  ];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

