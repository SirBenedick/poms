import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { IOrder, IFilterOrders } from "src/app/shared/interfaces";
import { BackendService } from "src/app/services/backend.service";
import { MatDialog } from '@angular/material';
import { OrderFilterPopupComponent } from 'src/app/components/order-filter-popup/order-filter-popup.component';
import { FAQComponent } from '../faq/faq.component';

@Component({
  selector: "app-printedorders",
  templateUrl: "./printedorders.component.html",
  styleUrls: ["./printedorders.component.css"]
})
export class PrintedordersComponent implements OnInit {
  allUngroupedOrders: Array<IOrder> = [];
  allReadyOrders: Array<any> = [];
  filteredUngroupedOrders: Array<IOrder> = [];
  newOrder: String;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog) {}

  ngOnInit() {
    if (this.backendService.allUngroupedOrders.length == 0) {
      this.backendService
        .pollAllOrdersFromBackend()
        .toPromise()
        .then((allOrderData: Array<IOrder>) => {
          this.readyOrders(allOrderData);
        });
    } else {
      this.readyOrders(this.backendService.allUngroupedOrders);
    }
  }
  //show all ReadyOrders
  readyOrders(allReadyUnsorted: Array<IOrder>) {
//Search all Orders
    allReadyUnsorted.forEach(singleReady => {
     //If Status===created, push the singleReady into the array
      if (singleReady.status === "created") {
        this.allUngroupedOrders.push(singleReady);
      } else {
        //push the singleReady into a new array
        this.allReadyOrders.push(singleReady);
      }
    });
    //for filter, with this the filter is accept
    this.filteredUngroupedOrders = this.allUngroupedOrders;
    
  }

filterUngroupedOrders(parameter: IFilterOrders) {
    this.resetOrderFilter();

    for (let key in parameter) {
      if (parameter[key]) {
        if (key == "dueDate") {
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
            order => {
              let orderDate = new Date(order[key]);
              if (
                parameter[key].start <= orderDate &&
                orderDate <= parameter[key].end
              )
                return true;
            }
          );
        } else {
          this.filteredUngroupedOrders = this.filteredUngroupedOrders.filter(
            order => order[key] == parameter[key]
          );
        }
      }
    }
  }

  resetOrderFilter() {
    this.filteredUngroupedOrders = this.allUngroupedOrders;
  }
  openDialogFilterOrders(): void {
    const dialogRef = this.dialog.open(OrderFilterPopupComponent, {
      data: { newOrderForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.filterUngroupedOrders(result.data);
    });
  }

  help():void{
    this.dialog.open(FAQComponent);
  }
}
