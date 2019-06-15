import { UploadService } from "./upload.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import {
  IOrder,
  IPrinterData,
  IGroupedOrders,
  IResinType,
  ICategory,
  ICustomer,
  IPrinterNew,
  IFAQPage,
  IFAQPageAlter,
  IFAQPageCreate,
  IResinName,
  ICustomerName,
  IResinDelete,
  ICustomerDelete,
  IAlterResin,
  ICategoryName,
  ICategoryDelete,
  IAlterCategory,
  IPrinterDataPolling,
  IOrderStatus
} from "../shared/interfaces";
import { switchMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  backendUrl = "http://141.19.113.166:8081/";
  mockedURL = "http://5cda86ebeb39f80014a756b7.mockapi.io/";

  /** Mocked Printer Data for testing multiple printer during development */
  mockedPrinterData: Array<IPrinterData> = [
    {
      printer_id: 23,
      name: "TestPrinter1",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.7068181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter2",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 1,
      offline: 0,
      progress: 0.5568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter3",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.7568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter4",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 0,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.1568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    }
  ];
  mockedResinData: Array<IResinType> = [
    { resin_name: "Cast UV", color: "#fe6254" },
    { resin_name: "Gingiva UV", color: "#f88379" },
    { resin_name: "T UV", color: "#3f99dd" },
    { resin_name: "Temp A1", color: "#fbfced" },
    { resin_name: "Temp A2", color: "#e2e4c1" },
    { resin_name: "Temp A3", color: "#c2b280" },
    { resin_name: "Tray UV", color: "#fafafa" },
    { resin_name: "UV Caramel", color: "#ffd59a" },
    { resin_name: "UV Grey", color: "#d8d8d8" },
    { resin_name: "UV Ivory", color: "#fffff0" }
  ];

  /** Observable which poll every pollingTimeInMs ms */
  pollingTimeInMs: number = 2000;
  reloadDataAfterMs: number = 2000;

  allOrderData$: Observable<Object>;
  allGroupData$: Observable<Object>;
  allPrinterData$: Observable<Object>;
  /** "everySinglePrinter$" saves only static data and allows components to subscribe to printer observables */
  everySinglePrinter$: Array<IPrinterDataPolling> = [];

  /** Values saved from polling */
  allUngroupedOrders: Array<IOrder> = [];
  allGroupData: Array<IGroupedOrders> = [];
  /** "allPrinterData" always up to date and easy accesible for quick information access */
  allPrinterData: Array<IPrinterData> = [];

  /**  Data that does not need to be polled */
  resineData: Array<IResinType>;
  customerData: Array<ICustomer>;
  helpData: Array<IFAQPage>;
  categorysData: Array<ICategory>;
  orderStatus: Array<IOrderStatus> = [
    { value: "created", display_name: "Druckbereit" },
    { value: "postPrint", display_name: "Nachbereitung" },
    { value: "sent", display_name: "Abgeschlossen" }
  ];

  constructor(private http: HttpClient, private uploadService: UploadService) {
    /** Starts observable and polls from Backend */
    this.startOrderObservable();
    this.startGroupObservable();
    this.startPrinterObservable();

    /** Loads data that does not need to be polled */
    this.loadResinData();
    this.loadHelpData();
    this.loadCustomerData();
    this.loadCategoryData();
  }

  startOrderObservable(): void {
    /** Creates observable which request data every "pollingTimeInMs" ms */
    this.allOrderData$ = timer(0, this.pollingTimeInMs).pipe(
      switchMap((counter: number) => this.getAllOrders()),
      catchError((err, caught) => caught)
    );
    /** Subscribes to observable and saves response in an array accessible for every component  */
    this.allOrderData$.subscribe((allOrderData: Array<any>) => {
      this.allUngroupedOrders = allOrderData;
    });
  }

  startGroupObservable(): void {
    /** Creates observable which request data every "pollingTimeInMs" ms */
    this.allGroupData$ = timer(0, this.pollingTimeInMs).pipe(
      switchMap((counter: number) => this.getAllGroups()),
      catchError((err, caught) => caught)
    );
    /** Subscribes to observable and saves response in an array accessible for every component  */
    this.allGroupData$.subscribe((allGroupData: Array<any>) => {
      this.allGroupData = allGroupData;
    });
  }

  startPrinterObservable() {
    /** Creates observable which request data every "pollingTimeInMs" ms */
    this.allPrinterData$ = timer(0, this.pollingTimeInMs).pipe(
      switchMap((counter: number) => this.getAllPrinter()),
      catchError((err, caught) => caught)
    );

    /** Subscribes to observable and saves response in an array accessible for every component  */
    this.allPrinterData$.subscribe((newPrinterData: Array<IPrinterData>) => {
      this.allPrinterData = newPrinterData;
      // this.allPrinterData = this.mockedPrinterData;

      /** If count of printer has changed then "everySinglePrinter$" gets updated */
      if (this.everySinglePrinter$.length != this.allPrinterData.length) {
        this.everySinglePrinter$ = [];
        /** Each printer becomes one observable and stores printer_id and the printer name*/
        this.allPrinterData.forEach((printer: IPrinterData) => {
          /** Creates observable for each printer */
          var singlePrinter$: Observable<IPrinterData> = <
            Observable<IPrinterData>
          >(<unknown>timer(0, this.pollingTimeInMs).pipe(
            switchMap((counter: number) =>
              this.getPrinterById(printer.printer_id)
            ),
            catchError((err, caught) => caught)
          ));
          /** Saves id, name and observable in an array accessible for every component  */
          this.everySinglePrinter$.push({
            printer_id: printer.printer_id,
            printer_name: printer.name,
            printer$: singlePrinter$
          });
        });
      }
    });
  }

  /** Umbennen in getAllOrders */
  getAllOrders(): Observable<Object> {
    //** Backendcall */
    return this.http.get(this.backendUrl + "order/get/all");
  }

  /** Umbennen in getAllPrinter */
  getAllPrinter(): Observable<Object> {
    //** Backendcall */
    return this.http.get(this.backendUrl + "printer/get/all");
  }

  loadResinData() {
    this.getAllResin().then((harzData: Array<IResinType>) => {
      // this.resineData = harzData;
      this.resineData = this.mockedResinData;
      this.resineData.sort();
    });
  }
  loadCustomerData() {
    this.getAllCustomer().then((customerData: Array<ICustomer>) => {
      this.customerData = customerData;
      this.customerData.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  loadCategoryData() {
    this.getAllCategoryData().then(
      (categoryData: Array<ICategory>) => (this.categorysData = categoryData)
    );
  }
  loadHelpData() {
    this.getAllHelpData().then(
      (helpData: Array<IFAQPage>) => (this.helpData = helpData)
    );
  }

  /** Get data */
  getPrinterById(id: Number): Observable<Object> {
    return this.http.get(this.backendUrl + "printer/get/" + id);
  }

  getAllResin(): Promise<Object> {
    return this.http.get(this.backendUrl + "resin/get/all/").toPromise();
  }

  getAllCustomer(): Promise<Object> {
    return this.http.get(this.backendUrl + "customer/get/all/").toPromise();
  }

  getAllCategoryData(): Promise<Object> {
    return this.http.get(this.backendUrl + "model_type/get/all/").toPromise();
  }

  getAllHelpData(): Promise<Object> {
    return this.http.get(this.backendUrl + "faq/get/all/").toPromise();
  }

  getAllGroups(): Observable<Object> {
    return this.http.get(this.backendUrl + "group/get/all");
  }

  getAllGroupData(): Array<IGroupedOrders> {
    return this.allGroupData;
  }

  getSearchResults(searchValue: string): Promise<Array<any>> {
    //this.http.get(this.backendUrl + "search/" + searchValue).toPromise();
    let mockedOptions: Array<{ category: string; result: string }> = [
      { category: "Hilfestellung", result: "Wie fülle ich harz auf" },
      { category: "Hilfestellung", result: "Wie fülle ich harz auf" },
      { category: "Hilfestellung", result: "Wie fülle ich harz auf" },
      { category: "Hilfestellung", result: "Wie fülle ich harz auf" },
      { category: "Hilfestellung", result: "Wie fülle ich harz auf" }
    ];
    return new Promise((resolve, reject) => {
      resolve(mockedOptions);
    });
  }

  /** Download */
  downloadSlicedFileFromGroup(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "group/download/" + id).toPromise();
  }

  downloadSkinFilesFromGroup(id: number): Promise<Object> {
    return this.http
      .get(this.backendUrl + "group/order/download" + id)
      .toPromise();
  }
  downloadScanFileFromOrder(id: number, filename: string = null): void {
    this.http
      .get(this.backendUrl + "order/download/scan/" + id, {
        responseType: "blob" as "json"
      })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  /** Create data*/
  createNewGroup(order: IOrder): Promise<Object> {
    return this.http
      .post(this.backendUrl + "group/create/", { order_id: order.order_id })
      .toPromise();
  }

  createNewOrder(newOrder: any): Observable<Object> {
    return this.uploadService.createNewOrder(newOrder);
  }

  addNewPrinter(newPrinter: IPrinterNew): Promise<Object> {
    return this.http
      .post(this.backendUrl + "printer/create/", newPrinter)
      .toPromise();
  }

  createResin(createNewResin: IResinName): Promise<Object> {
    setTimeout(res => this.loadResinData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "resin/create/", createNewResin)
      .toPromise();
  }

  createCustomer(createNewCustomer: ICustomerName): Promise<Object> {
    setTimeout(res => this.loadCustomerData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "customer/create/", createNewCustomer)
      .toPromise();
  }

  createCategory(createNewCategory: ICategoryName): Promise<Object> {
    setTimeout(res => this.loadCategoryData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "model_type/create/", createNewCategory)
      .toPromise();
  }
  createFAQ(createTopic: IFAQPageCreate): Promise<Object> {
    return this.http
      .post(this.backendUrl + "faq/create/", createTopic)
      .toPromise();
  }

  /** Modify existing data */
  alterFAQ(alteredTopic: IFAQPageAlter): Promise<Object> {
    return this.http
      .post(this.backendUrl + "faq/alter/", alteredTopic)
      .toPromise();
  }

  assignOrderToGroup(order_id: number, group_id: number): Promise<Object> {
    return this.http
      .get(this.backendUrl + "order/assign/" + order_id + "/to/" + group_id)
      .toPromise();
  }

  alterOrderById(order_id: number, alteredOrder: FormData): Promise<Object> {
    /** When an order is in status "sent" the ground information needs to get removed so it does not get displayed twice */
    if (alteredOrder.get("status") === "sent") {
      return this.assignOrderToGroup(order_id, 0).then(res =>
        this.uploadService.alterOrderById(order_id, alteredOrder)
      );
    } else return this.uploadService.alterOrderById(order_id, alteredOrder);
  }

  alterResin(new_name: IAlterResin): Promise<Object> {
    setTimeout(res => this.loadResinData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "resin/alter/", new_name)
      .toPromise();
  }

  alterCategory(alteredCategory: IAlterCategory): Promise<Object> {
    setTimeout(res => this.loadCategoryData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "model_type/alter/", alteredCategory)
      .toPromise();
  }

  alterCustomer(customer_id: number, newCustomer: Object): Promise<Object> {
    setTimeout(res => this.loadCustomerData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "customer/alter/" + customer_id, newCustomer)
      .toPromise();
  }

  alterGroupOrderStatus(group_id: number): Promise<Object> {
    return this.http
      .post(this.backendUrl + "group/alter/orders", { id: group_id })
      .toPromise();
  }

  alterGroupStatus(group_id: number, status: string): Promise<Object> {
    return this.http
      .post(this.backendUrl + "group/alter/1", { id: group_id, status: status })
      .toPromise();
  }

  /** Remove existing data */
  removeOrderById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "order/remove/" + id).toPromise();
  }

  removePrinterById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "printer/remove/" + id).toPromise();
  }

  removeResinByName(name: IResinDelete): Promise<Object> {
    setTimeout(res => this.loadResinData(), this.reloadDataAfterMs);
    return this.http.post(this.backendUrl + "resin/remove/", name).toPromise();
  }

  removeCategoryByName(name: ICategoryDelete): Promise<Object> {
    setTimeout(res => this.loadCategoryData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "model_type/remove/", name)
      .toPromise();
  }

  removeCustomerByName(
    customer_id: ICustomerDelete,
    name: any
  ): Promise<Object> {
    setTimeout(res => this.loadCustomerData(), this.reloadDataAfterMs);
    return this.http
      .post(this.backendUrl + "customer/remove/" + customer_id, name)
      .toPromise();
  }

  removeGroupById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "group/remove/" + id).toPromise();
  }

  /** Controll printer */

  assignGroupToPrinterAndStartPrint(
    group_id: number,
    printer_id: number,
    email: string
  ): Promise<Object> {
    return this.http
      .post(
        this.backendUrl +
          "printer/action/upload/" +
          printer_id +
          "/" +
          group_id,
        { email_to_notify: email }
      )
      .toPromise();
  }

  /** Controlls printer, for development */
  startPrinter(id: Number) {
    return this.http
      .get(this.backendUrl + "printer/action/start/" + id)
      .toPromise();
  }
  stopPrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/stop/" + id);
  }
  togglePrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/toggle/" + id);
  }
}
