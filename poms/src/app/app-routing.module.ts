import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterComponent } from './pages/printer/printer.component';
import { OrderComponent } from './pages/order/order.component';
import { PrintedordersComponent } from './pages/printedorders/printedorders.component';
import { FAQComponent } from './pages/faq/faq.component';


const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'printer', component: PrinterComponent},
  //{path: '**', redirectTo: '/'},
  {path: 'order', component: OrderComponent},
  {path: 'printedorders', component: PrintedordersComponent},
  {path: 'hilfestellung', component: FAQComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
