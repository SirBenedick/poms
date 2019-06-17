import { BackendService } from "./../../services/backend.service";
import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import { CreateNewOrderComponent } from "src/app/components/pop-ups/create-new-order/create-new-order.component";
import { User, IPrinterDataPolling } from "src/app/shared/interfaces";
import { LoginService } from "src/app/services/login.service";
import { LogoutComponent } from "../pop-ups/logout/logout.component";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: "app-basic-layout",
  templateUrl: "./basic-layout.component.html",
  styleUrls: ["./basic-layout.component.css"]
})
export class BasicLayoutComponent implements OnInit {
  refreshWaitTimeInMs: number = 20000;
  firstLoadAfterMs: number = 2000;
  currentUser: User;
  menuItems;

  /** "printerData" mapped to this.backendService.everySinglePrinter$ to display in printer.html */
  printerData: Array<IPrinterDataPolling> = [];

  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private authService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    /** First start backendService might not have polled data yet */
    if (this.backendService.everySinglePrinter$.length == 0)
      setTimeout(res => this.refreshPrinterList(), this.firstLoadAfterMs);
    else this.refreshPrinterList();
    /** Sets every "refreshWaitTimeInMs"ms "printerData" to updated value, needed for when a new printer is added or one is removed */
    setInterval(res => this.refreshPrinterList(), this.refreshWaitTimeInMs);

    /** Sets selected menu item inital to "auftragsuebersicht" */
    this.menuItems = {
      auftragsuebersicht: true,
      gedruckte_auftraege: false,
      druckerverwaltung: false,
      hilfestellung: false,
      einstellung: false
    };
  }

  refreshPrinterList() {
    this.printerData = this.backendService.everySinglePrinter$;
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

          this.backendService.createNewOrder(newOrder).subscribe((res: any) => {
            if (res.error) {
              Swal.fire({
                title: 'Fehler!',
                text: res.error,
                confirmButtonText: "Ok",
                confirmButtonColor: "#62c6d6",
                background: 'url(../assets/svg/FehlerPopUp.svg)',
              })
              console.log("createNewOrder Error: ", res.error);
            } else {
              console.log("createNewOrder Response: ", res);
            }
          });
          console.log(newOrder);
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  onMenuItem(menuItem) {
    for (const key in this.menuItems) {
      this.menuItems[key] = false;
    }
    this.menuItems[menuItem] = true;
  }
}
