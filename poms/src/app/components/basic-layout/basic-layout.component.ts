import { Observable } from "rxjs";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { IOrderCreateNew, User } from "src/app/shared/interfaces";
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
      data: { newPrinterForm: this.newOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.value) {
          let order = result.value;
          let newOrder: IOrderCreateNew = {
            customer_id: parseInt(order.customer),
            patient: order.patient,
            dental_print_type: order.dentalPrintType,
            resin_name: order.harz,
            due_date: order.dueDate,
            comment: order.comment,
            status: "created",
            scan_file: null
          };
          this.backendService.createNewOrder(newOrder).then((res: any) => {
            if (res.error) {
              alert(res.error);
              console.log(res.error);
            }
            //ggf müssen hier alle aufträge neugeladen/angezeigt werden
            //bei in order.ts und basic-layout.ts
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
