import { Component, OnInit, Input } from "@angular/core";
import { IOrder } from "src/app/shared/interfaces";
import { CreateNewOrderComponent } from "../create-new-order/create-new-order.component";
import { MatDialogRef, MatDialog } from "@angular/material";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-order-card",
  templateUrl: "./order-card.component.html",
  styleUrls: ["./order-card.component.css"]
})
export class OrderCardComponent implements OnInit {
  @Input() order: IOrder;
  allUngroupedOrders: Array<IOrder> = [];
  ordersNameDialogRef: MatDialogRef<CreateNewOrderComponent>;
  constructor(
    private dialog: MatDialog,
    private backendService: BackendService
  ) {}

  ngOnInit() { }

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
    //    result.findIndex(o => o.groupId == result.groupId);
    // }
    // else{
    // console.log("Test")
    //       // this.newOrder = result;
    //       }
    //     });
  }
}
