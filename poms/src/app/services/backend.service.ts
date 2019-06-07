import { UploadService } from "./upload.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer, Subscription } from "rxjs";
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
  IAlterCategory
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

  printerSubscriptions: Array<Subscription> = [];

  allOrderData$: Observable<Object>;
  allPrinterData$: Observable<Object>;
  allGroupData$: Observable<Object>;

  allUngroupedOrders: Array<IOrder> = [];
  allGroupData: Array<IGroupedOrders> = [];
  allPrinterData: Array<IPrinterData> = [];
  everyPrinter: Array<Observable<IPrinterData>> = [];

  /**  Data that does not need to be polled */
  resineData: Array<IResinType>;
  customerData: Array<ICustomer>;
  helpData: Array<IFAQPage>;
  categorysData: Array<ICategory>;

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

  async startPrinterObservable() {
    this.printerSubscriptions.forEach(printerSub => printerSub.unsubscribe());
    this.printerSubscriptions = [];

    this.allPrinterData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllPrinterFromBackend()),
      catchError((err, caught) => caught)
    );
    this.printerSubscriptions.push(
      this.allPrinterData$.subscribe((newPrinterData: Array<IPrinterData>) => {
        this.allPrinterData = newPrinterData;
        // this.allPrinterData = this.mockedPrinterData;
        if (this.everyPrinter.length != newPrinterData.length){
          this.everyPrinter=[];
          this.allPrinterData.forEach((printer: IPrinterData) => {
            var singlePrinter$: Observable<IPrinterData> = <
              Observable<IPrinterData>
            >(<unknown>timer(0, 2000).pipe(
              switchMap((counter: number) =>
                this.getPrinterById(printer.printer_id)
              ),
              catchError((err, caught) => caught)
            ));
            this.everyPrinter.push(singlePrinter$);
          });
      }
      })
    );
    return this.everyPrinter.length;
  }

  startGroupObservable() {
    this.allGroupData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.getAllGroups()),
      catchError((err, caught) => caught)
    );
    this.allGroupData$.subscribe((allGroupData: Array<any>) => {
      this.allGroupData = allGroupData;
    });
  }

  startOrderObservable() {
    this.allOrderData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllOrdersFromBackend()),
      catchError((err, caught) => caught)
    );
    this.allOrderData$.subscribe((allOrderData: Array<any>) => {
      this.allUngroupedOrders = allOrderData;
    });
  }

  pollAllOrdersFromBackend(): Observable<Object> {
    //** Backendcall */
    return this.http.get(this.backendUrl + "order/get/all");
    //** Mocked Data */
    // console.log("pollAllOrdersFromBackend");
    // return this.http.get(this.mockedURL + "allOrders");
  }

  pollAllPrinterFromBackend(): Observable<Object> {
    //** Backendcall */
    // return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllPrinterFromBackend");
    // return this.http.get(this.mockedURL + "allPrinter");
    return this.http.get(this.backendUrl + "printer/get/all");
  }

  getPrinterById(id: Number): Observable<Object> {
    console.log("getPrinterById: ", id);
    return this.http.get(this.backendUrl + "printer/get/" + id);
  }

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

  loadResinData() {
    this.getAllResin().then((harzData: Array<IResinType>) => {
      this.resineData = harzData;
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

  //Get
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

  //Create
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
    return this.http
      .post(this.backendUrl + "resin/create/", createNewResin)
      .toPromise();
  }

  createCustomer(createNewCustomer: ICustomerName): Promise<Object> {
    return this.http
      .post(this.backendUrl + "customer/create/", createNewCustomer)
      .toPromise();
  }

  createCategory(createNewCategory: ICategoryName): Promise<Object> {
    return this.http
      .post(this.backendUrl + "model_type/create/", createNewCategory)
      .toPromise();
  }
  createFAQ(createTopic: IFAQPageCreate): Promise<Object> {
    return this.http
      .post(this.backendUrl + "faq/create/", createTopic)
      .toPromise();
  }

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
  removeGroupById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "group/remove/" + id).toPromise();
  }

  alterOrderById(order_id: number, alteredOrder: Object): Promise<Object> {
    return this.uploadService.alterOrderById(order_id, alteredOrder);
  }

  alterResin(new_name: IAlterResin): Promise<Object> {
    return this.http
      .post(this.backendUrl + "resin/alter/", new_name)
      .toPromise();
  }

  alterCategory(alteredCategory: IAlterCategory): Promise<Object> {
    return this.http
      .post(this.backendUrl + "model_type/alter/", alteredCategory)
      .toPromise();
  }

  alterCustomer(customer_id: number, newCustomer: Object): Promise<Object> {
    return this.http
      .post(this.backendUrl + "customer/alter/" + customer_id, newCustomer)
      .toPromise();
  }

  removeOrderById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "order/remove/" + id).toPromise();
  }

  removePrinterById(id: number): Promise<Object> {
    return this.http.get(this.backendUrl + "printer/remove/" + id).toPromise();
  }

  removeResinByName(name: IResinDelete): Promise<Object> {
    return this.http.post(this.backendUrl + "resin/remove/", name).toPromise();
  }

  removeCategoryByName(name: ICategoryDelete): Promise<Object> {
    return this.http
      .post(this.backendUrl + "model_type/remove/", name)
      .toPromise();
  }

  removeCustomerByName(
    customer_id: ICustomerDelete,
    name: any
  ): Promise<Object> {
    return this.http
      .post(this.backendUrl + "customer/remove/" + customer_id, name)
      .toPromise();
  }
}
