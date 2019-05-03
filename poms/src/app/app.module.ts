import { PrinterComponent } from './pages/printer/printer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { SidebarDirective } from './directives/sidebar.directive';
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    PrinterComponent,
    SidebarDirective,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
