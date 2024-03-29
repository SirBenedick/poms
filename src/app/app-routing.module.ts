import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrinterComponent } from "./pages/printer/printer.component";
import { OrderComponent } from "./pages/order/order.component";
import { PrintedordersComponent } from "./pages/printedorders/printedorders.component";
import { FAQComponent } from "./pages/faq/faq.component";
import { EinstellungenComponent } from "./pages/einstellungen/einstellungen.component";
import { LoginComponent } from "./components/login/login.component";
import { BenutzerService } from "./services/benutzer.service";
import { Role } from "./shared/interfaces";
import { LogoutComponent } from './components/pop-ups/logout/logout.component';
import { PopUpDruckenComponent } from './components/pop-ups/pop-up-drucken/pop-up-drucken.component';

const routes: Routes = [
  //Seiten auf die mal geleitet wird, wenn man entsprechen Path angibt
  { path: "", component: OrderComponent },
  { path: "printer", component: PrinterComponent },
  //{path: '**', redirectTo: '/'},
  { path: "order", component: OrderComponent },
  { path: "printedorders", component: PrintedordersComponent },
  { path: "hilfestellung", component: FAQComponent },
  //ist gesperrt für User, nur für Admin sichtbar, wird über canActivate freigeschaltet
  {
    path: "einstellungen",
    component: EinstellungenComponent,
    canActivate: [BenutzerService],
    data: { roles: [Role.Admin] }
  },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
