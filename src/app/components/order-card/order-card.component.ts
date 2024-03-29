import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IOrder } from "src/app/shared/interfaces";
import { CreateNewOrderComponent } from "../pop-ups/create-new-order/create-new-order.component";
import { MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.css"]
})
export class OrderCardComponent implements OnInit {
  @Output() onRefreshOrders = new EventEmitter();
  @Input() order: IOrder;
  
  dateForFrontendView: string;
  allUngroupedOrders: Array<IOrder> = [];
  ordersNameDialogRef: MatDialogRef<CreateNewOrderComponent>;

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let oldDateFormat = new Date(this.order.due_date);
    this.dateForFrontendView =
      oldDateFormat.getFullYear() +
      "-" +
      ("00" + (oldDateFormat.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + oldDateFormat.getDate()).slice(-2);
  }

  onCardClick(event) {
    this.ordersNameDialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: event.order
    });
    this.ordersNameDialogRef.afterClosed().subscribe(res => {
      this.onRefreshOrders.emit();
    });
  }
}
