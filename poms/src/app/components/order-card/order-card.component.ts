import { ConverterService } from "./../../services/converter.service";
import { Component, OnInit, Input } from "@angular/core";
import { IOrder, IOrderCreateNew } from "src/app/shared/interfaces";
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
    private backendService: BackendService,
    private converterService: ConverterService
  ) {}

  ngOnInit() {
    // if (!this.order.order_id) {
    //   this.order = this.converterService.ordersBackendToFrontend([
    //     <any>this.order
    //   ])[0];
    // }
    // console.log("this card: ", this.order)
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
