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
import { CreateNewOrderComponent } from "./components/pop-ups/create-new-order/create-new-order.component";
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
import { OrderFilterPopupComponent } from "./components/pop-ups/order-filter-popup/order-filter-popup.component";
import { BackendService } from "./services/backend.service";
import { LoginService } from "./services/login.service";
import { BenutzerService } from "./services/benutzer.service";
import { TestbackendProvider } from "./services/testbackend.service";
import { PopUpNeuerDruckerComponent } from './components/pop-ups/pop-up-neuer-drucker/pop-up-neuer-drucker.component';
import { FilterButtonActivatedDirective } from './directives/filter-button-activated.directive';
import { PopUpFAQComponent } from './components/pop-ups/pop-up-faq/pop-up-faq.component';
import { PopUpDruckenComponent } from './components/pop-ups/pop-up-drucken/pop-up-drucken.component';
import { PopUpVanikComponent } from './components/pop-ups/pop-up-vanik/pop-up-vanik.component';
import { LogoutComponent } from './components/pop-ups/logout/logout.component';
import { ErrorPopUpComponent } from './components/pop-ups/error-pop-up/error-pop-up.component';
import { FAQPopUpComponent } from './components/pop-ups/faqpop-up/faqpop-up.component';
import { UrlTextPopUpComponent } from './components/pop-ups/url-text-pop-up/url-text-pop-up.component';
import { DeactiveGroupDirective } from './directives/deactive-group.directive';
import { NeuerKundeComponent } from './components/pop-ups/Settings/neuer-kunde/neuer-kunde.component';
import { NeuesHarzComponent } from './components/pop-ups/Settings/neues-harz/neues-harz.component';
import { NeueKategorieComponent } from './components/pop-ups/Settings/neue-kategorie/neue-kategorie.component';
import { PrinterStatusPipe } from './shared/pipes/printer-status.pipe';
import { KundeninfobearbeitenComponent } from './components/pop-ups/Settings/kundeninfobearbeiten/kundeninfobearbeiten.component';
import { KundeloeschenComponent } from './components/pop-ups/Settings/kundeloeschen/kundeloeschen.component';
import { KategorieinfobearbeitenComponent } from './components/pop-ups/Settings/kategorieinfobearbeiten/kategorieinfobearbeiten.component';
import { KategorieloeschenComponent } from './components/pop-ups/Settings/kategorieloeschen/kategorieloeschen.component';
import { HarzinfobearbeitenComponent } from './components/pop-ups/Settings/harzinfobearbeiten/harzinfobearbeiten.component';
import { HarzloeschenComponent } from './components/pop-ups/Settings/harzloeschen/harzloeschen.component';
import { OrderIdLeadingZeros } from './shared/pipes/order-id-leading-zeros.pipe';
import { PostprintGroupActionComponent } from './components/pop-ups/postprint-group-action/postprint-group-action.component';


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
    PopUpVanikComponent,
    LogoutComponent,
    ErrorPopUpComponent,
    FAQPopUpComponent,
    UrlTextPopUpComponent,
    DeactiveGroupDirective,
    NeuerKundeComponent,
    NeuesHarzComponent,
    NeueKategorieComponent,
    PrinterStatusPipe,
    OrderIdLeadingZeros,
    KundeninfobearbeitenComponent,
    KundeloeschenComponent,
    KategorieinfobearbeitenComponent,
    KategorieloeschenComponent,
    HarzinfobearbeitenComponent,
    HarzloeschenComponent,
    PostprintGroupActionComponent,
    PostprintGroupActionComponent
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
    LogoutComponent,
    ErrorPopUpComponent,
    FAQPopUpComponent,
    UrlTextPopUpComponent,
    NeuerKundeComponent,
    KundeninfobearbeitenComponent,
    KundeloeschenComponent,
    NeuesHarzComponent,
    HarzinfobearbeitenComponent,
    HarzloeschenComponent,
    NeueKategorieComponent,
    KategorieinfobearbeitenComponent,
    KategorieloeschenComponent,
    PostprintGroupActionComponent
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
