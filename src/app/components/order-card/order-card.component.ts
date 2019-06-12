import { Component, OnInit, Input } from "@angular/core";
import { IOrder } from "src/app/shared/interfaces";
import { CreateNewOrderComponent } from "../pop-ups/create-new-order/create-new-order.component";
import { MatDialogRef, MatDialog } from "@angular/material";
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.css"]
})
export class OrderCardComponent implements OnInit {
  @Input() order: IOrder;
  dateForFrontendView: string;
  allUngroupedOrders: Array<IOrder> = [];
  ordersNameDialogRef: MatDialogRef<CreateNewOrderComponent>;

  constructor(
    private dialog: MatDialog,
    private backendService: BackendService) {}

  ngOnInit() {
    let oldDateFormat = new Date(this.order.creation_date);
    this.dateForFrontendView =
    oldDateFormat.getFullYear()+
    "-" +
    (oldDateFormat.getMonth() + 1) +
    "-" +
    oldDateFormat.getDate()
      
  }

  onCardClick(event) {
    this.ordersNameDialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: event.order
    });
  }
}
