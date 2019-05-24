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
  backendUrl = "http://141.19.113.166:8081/";
  mockedURL = "http://5cda86ebeb39f80014a756b7.mockapi.io/";

  allOrderData$: Observable<Object>;
  allPrinterData$: Observable<Object>;
  allPrinterDataSubscription: Subscription;

  allUngroupedOrders: Array<IOrder> = [];
  allPrinterData: Array<IPrinterData> = [];

  constructor(private http: HttpClient) {
    /** Starts observable and polls all OrderData from Backend */
    this.allOrderData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllOrdersFromBackend()),
      catchError((err, caught) => caught)
    );
    this.allOrderData$.subscribe(
      (allOrderData: Array<IOrder>) => (this.allUngroupedOrders = allOrderData)
    );

    /** Starts observable and polls all PrinterData from Backend */
    this.allPrinterData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllPrinterFromBackend()),
      catchError((err, caught) => caught)
    );
    this.allPrinterDataSubscription = this.allPrinterData$.subscribe(
      (newPrinterData: Array<IPrinterData>) =>
        (this.allPrinterData = newPrinterData)
    );
  }

  pollAllOrdersFromBackend(): Observable<Object> {
    //** Backendcall */
    // return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllOrdersFromBackend");
    return this.http.get(this.mockedURL + "allOrders");
  }

  pollAllPrinterFromBackend(): Observable<Object> {
    //** Backendcall */
    //return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllPrinterFromBackend");
    // return this.http.get(this.mockedURL + "allPrinter");
    return this.http.get(this.backendUrl + "printer/get/all");
  }

  startPrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/start/" + id);
  }
  stopPrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/stop/" + id);
  }
  togglePrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/toggle/" + id);
  }

  getAllResin(): Promise<Object> {
    return this.http.get(this.backendUrl + "resin/get/all/").toPromise();
  }
  createNewGroup(order: IOrder): Promise<Object> {
    //example API-Call, URL not yet real
    return this.http.get(this.backendUrl + "group/create/").toPromise();
  }
}
