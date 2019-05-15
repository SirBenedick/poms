import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  url = "http://192.168.56.101:8082/";

  constructor(private http: HttpClient) {}

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
        { orderId: 4, groupId: null, dueDate: "09.05.2019", priority: "niedrig" },
        { orderId: 5, groupId: null, dueDate: "09.05.2019", priority: "hoch" },
        { orderId: 6, groupId: null, dueDate: "09.05.2019", priority: "niedrig" },
        { orderId: 7, groupId: null, dueDate: "09.05.2019", priority: "hoch" },
        { orderId: 8, groupId: null, dueDate: "09.05.2019", priority: "niedrig" },
      ]);
    });
  }
}
