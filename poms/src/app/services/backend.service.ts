import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, timer } from "rxjs";
import { IOrder, IPrinterData } from "../shared/interfaces";
import { switchMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  url = "http://192.168.56.101:8082/";
  mockedURL = "http://5cda86ebeb39f80014a756b7.mockapi.io/";

  allOrderDataSubscription: Subscription;
  allPrinterDataObservable: Observable<Object>;
  allPrinterDataSubscription: Subscription;
  
  allUngroupedOrders: Array<IOrder> = [];
  allPrinterData: Array<IPrinterData> = [];


  constructor(private http: HttpClient) {
    /** Starts observable and polls all OrderData from Backend */
    this.allOrderDataSubscription = timer(0, 2000)
      .pipe(
        switchMap((counter: number) => this.pollAllOrdersFromBackend()),
        catchError((err, caught) => caught)
      )
      .subscribe((newOrderData: Array<IOrder>) => {
        // console.log("Polling new Data", newOrderData);
        this.allUngroupedOrders = newOrderData;
      });

    /** Starts observable and polls all PrinterData from Backend */
    this.allPrinterDataObservable = timer(0, 2000)
      .pipe(
        switchMap((counter: number) => this.pollAllPrinterFromBackend()),
        catchError((err, caught) => caught)
      )
      this.allPrinterDataSubscription = this.allPrinterDataObservable
      .subscribe((newPrinterData: Array<IPrinterData>) => {
        // console.log("Polling new Data", newPrinterData);
        this.allPrinterData = newPrinterData;
      });
  }
  pollAllOrdersFromBackend(): Observable<Object> {
    //** Backendcall */
    //return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllOrdersFromBackend");
    return this.http.get(this.mockedURL + "allOrders");
  }

  pollAllPrinterFromBackend(): Observable<Object> {
    //** Backendcall */
    //return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllPrinterFromBackend");
    return this.http.get(this.mockedURL + "allPrinter");
  }



  getUserData(id: number): Observable<Object> {
    return this.http.get(this.url + String(id + 1));
  }

  testLog(): void {
    console.log("Void");
  }

  printerGetAll(): Observable<Object> {
    return this.http.get(this.url + "printer/get/all/");
  }
  printerGet(id: number): Observable<Object> {
    return this.http.get(this.url + "printer/get/" + String(id));
  }

  /** Mocked Data */
  getAllOrders(): Promise<Object> {
    return new Promise(resolve => {
      resolve([
        { orderId: 1, groupId: 1, dueDate: "09.05.2019", priority: "hoch" },
        { orderId: 2, groupId: 2, dueDate: "09.05.2019", priority: "niedrig" },
        { orderId: 3, groupId: 5, dueDate: "09.05.2019", priority: "hoch" },
        {
          orderId: 4,
          groupId: null,
          dueDate: "09.05.2019",
          priority: "niedrig"
        },
        { orderId: 5, groupId: null, dueDate: "09.05.2019", priority: "hoch" },
        {
          orderId: 6,
          groupId: null,
          dueDate: "09.05.2019",
          priority: "niedrig"
        },
        { orderId: 7, groupId: null, dueDate: "09.05.2019", priority: "hoch" },
        {
          orderId: 8,
          groupId: null,
          dueDate: "09.05.2019",
          priority: "niedrig"
        }
      ]);
    });
  }
}
