import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrinterComponent } from './pages/printer/printer.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {path: '', component: PrinterComponent},
  {path: 'printer', component: PrinterComponent},
  //{path: '**', redirectTo: '/'},
  {path: 'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }