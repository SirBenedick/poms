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
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { PrintedordersComponent } from './pages/printedorders/printedorders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';

registerLocaleData(de);
@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    PrinterComponent,
    SidebarDirective,
    OrderComponent,
    PrintedordersComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    MatExpansionModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
