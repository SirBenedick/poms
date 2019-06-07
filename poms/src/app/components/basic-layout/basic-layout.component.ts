import { Observable } from "rxjs";
import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/create-new-order/create-new-order.component";
import { User, IPrinterData } from "src/app/shared/interfaces";
import { LoginService } from "src/app/services/login.service";
import { LogoutComponent } from "../logout/logout.component";
@Component({
  selector: "app-basic-layout",
  templateUrl: "./basic-layout.component.html",
  styleUrls: ["./basic-layout.component.css"]
})
export class BasicLayoutComponent implements OnInit {
  currentUser: User;
  //printerSubscription: Observable<Object>;
  everyPrinter: Array<Observable<IPrinterData>> = this.backendService
    .everyPrinter;
  menuItems;

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private authService: LoginService
  ) {}

  ngOnInit() {
    //this.printerSubscription = this.backendService.allPrinterData$;
    console.log("length: ", this.everyPrinter.length);
    setInterval(res => {
      if (this.backendService.everyPrinter) {
        this.everyPrinter = this.backendService.everyPrinter;
        console.log("intervalli")
        return;
      }
    }, 1000);
    this.menuItems = {
      auftragsuebersicht: true,
      gedruckte_auftraege: false,
      druckerverwaltung: false,
      hilfestellung: false,
      einstellung: false
    };
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
          let newOrder = new FormData();
          newOrder.append("customer_id", order.customer_id);
          newOrder.append("patient", order.patient);
          newOrder.append("dental_print_type", order.dental_print_type);
          newOrder.append("resin_name", order.harz);
          newOrder.append("due_date", order.dueDate);
          newOrder.append("comment", order.comment);
          newOrder.append("status", "created");
          newOrder.append("scan_file", order.hochladen.files[0]);
          console.log(order.hochladen.files[0]);
          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              alert(res.error);
              console.log("createNewOrder Error: ", res.error);
            } else {
              console.log("createNewOrder Response: ", res);
            }
          });
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.dialog.open(LogoutComponent);
  }

  onMenuItem(menuItem) {
    for (const key in this.menuItems) {
      this.menuItems[key] = false;
    }
    this.menuItems[menuItem] = true;
  }
}
