import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterComponent } from './pages/printer/printer.component';
import { OrderComponent } from './pages/order/order.component';
import { PrintedordersComponent } from './pages/printedorders/printedorders.component';
import { FAQComponent } from './pages/faq/faq.component';
import { EinstellungenComponent } from './pages/einstellungen/einstellungen.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  // {path: '', component: OrderComponent},
  {path: '', component: LoginComponent},
  {path: 'printer', component: PrinterComponent},
  //{path: '**', redirectTo: '/'},
  {path: 'order', component: OrderComponent},
  {path: 'printedorders', component: PrintedordersComponent},
  {path: 'hilfestellung', component: FAQComponent},
  {path: 'einstellungen', component: EinstellungenComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
