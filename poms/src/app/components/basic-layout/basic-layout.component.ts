import { Observable } from "rxjs";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { IOrderCreateNew, User, IOrder } from "src/app/shared/interfaces";
import { LoginService } from 'src/app/services/login.service';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: "app-basic-layout",
  templateUrl: "./basic-layout.component.html",
  styleUrls: ["./basic-layout.component.css"]
})
export class BasicLayoutComponent implements OnInit {
  currentUser: User;
  printerSubscription: Observable<Object>;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private authService: LoginService,
    
  ) {}

  ngOnInit() {
    this.printerSubscription = this.backendService.allPrinterData$;
  }

  newOrder() {
    console.log("function called");
  }

  openDialogCreateNewOrder(): void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent, {
      data: { newPrinterForm: "Keine Auswahl getroffen" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          let order = result.value;
          console.log(result.value);
          let newOrder: IOrderCreateNew = {
            customer_id: parseInt(order.customer_id),
            patient: order.patient,
            dental_print_type: order.dental_print_type,
            resin_name: order.harz,
            due_date: order.dueDate,
            comment: order.comment,
            status: "created",
            scan_file: order.hochladen.files[0]
          };
          console.log(newOrder);
          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              alert(res.error);
              console.log(res.error);
            } else {
              console.log("createNewOrder: ", res);
            }
          });
        }
      }
    });
  }
  logout() {
    this.authService.logout();
    this.dialog.open(LogoutComponent)
  }
}
