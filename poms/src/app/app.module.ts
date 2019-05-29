import { PrinterComponent } from "./pages/printer/printer.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { BasicLayoutComponent } from "./components/basic-layout/basic-layout.component";
import { SidebarDirective } from "./directives/sidebar.directive";
import { OrderComponent } from "./pages/order/order.component";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import de from "@angular/common/locales/de";
import { PrintedordersComponent } from "./pages/printedorders/printedorders.component";
import { OrderCardComponent } from "./components/order-card/order-card.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule, MatSliderModule } from "@angular/material";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CreateNewOrderComponent } from "./components/create-new-order/create-new-order.component";
import { MatOptionModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/";
import { MatNativeDateModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { StatusComponent } from "./components/status/status.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FAQComponent } from "./pages/faq/faq.component";
import { EinstellungenComponent } from "./pages/einstellungen/einstellungen.component";
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from "./components/login/login.component";
import { MatProgressSpinnerModule } from "@angular/material";
import { OrderFilterPopupComponent } from "./components/order-filter-popup/order-filter-popup.component";
import { BackendService } from "./services/backend.service";
import { LoginService } from "./services/login.service";
import { BenutzerService } from "./services/benutzer.service";
import { TestbackendProvider } from "./services/testbackend.service";
import { PopUpNeuerDruckerComponent } from './components/pop-up-neuer-drucker/pop-up-neuer-drucker.component';
import { FilterButtonActivatedDirective } from './directives/filter-button-activated.directive';
import { PopUpFAQComponent } from './components/pop-up-faq/pop-up-faq.component';
import { PopUpDruckenComponent } from './components/pop-up-drucken/pop-up-drucken.component';
import { PopUpVanikComponent } from './components/pop-up-vanik/pop-up-vanik.component';

registerLocaleData(de);
@NgModule({
  declarations: [
    AppComponent,
    BasicLayoutComponent,
    PrinterComponent,
    SidebarDirective,
    OrderComponent,
    PrintedordersComponent,
    OrderCardComponent,
    CreateNewOrderComponent,
    StatusComponent,
    FAQComponent,
    EinstellungenComponent,
    LoginComponent,
    OrderFilterPopupComponent,
    PopUpNeuerDruckerComponent,
    FilterButtonActivatedDirective,
    PopUpFAQComponent,
    PopUpDruckenComponent,
    PopUpVanikComponent
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
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],

  entryComponents: [
    CreateNewOrderComponent,
    OrderFilterPopupComponent,
    PopUpNeuerDruckerComponent,
    PopUpFAQComponent,
    PopUpDruckenComponent,
    PopUpVanikComponent,
  ],
  //alle Services einbinden
  providers: [
    BackendService,
    LoginService,
    BenutzerService,
    TestbackendProvider,
    //notwendige Angeben für den Dialog in den einzelnen Componenten
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
