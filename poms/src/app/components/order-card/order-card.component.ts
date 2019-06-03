import { Component, OnInit, Input } from "@angular/core";
import { IOrder } from "src/app/shared/interfaces";
import { CreateNewOrderComponent } from "../create-new-order/create-new-order.component";
import { MatDialogRef, MatDialog } from "@angular/material";

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

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    let oldDateFormat = new Date(this.order.creation_date);
    this.dateForFrontendView =
      oldDateFormat.getFullYear() +
      "-" +
      (oldDateFormat.getMonth() + 1) +
      "-" +
      oldDateFormat.getDate();
  }

  onCardClick(event) {
    this.ordersNameDialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: event.order
    });

    //  MS- Änderungen sollen gespeichert werden und auch angezeigt werden
    // this.ordersNameDialogRef.afterClosed().pipe(
    // filter(result => result))
    // .subscribe(result =>{
    //   event.order.
    // });
    //   console.log(result.order)
    //   if(event){
    //    result.findIndex(o => o.group_id == result.group_id);
    // }
    // else{
    // console.log("Test")
    //       // this.newOrder = result;
    //       }
    //     });
  }
}
