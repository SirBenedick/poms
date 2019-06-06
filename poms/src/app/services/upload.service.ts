import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IOrderCreateNew } from "../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  url = "http://141.19.113.166:8081/";

  uploadScan(fileToUpload: any, id: number): Observable<Object> {
    let input = new FormData();
    input.append("scan_file", fileToUpload);
    console.log("input: ", input)
    return this.http
      .post(this.url + "order/upload/scan/" + id, input, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: "progress", message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
  createNewOrder(newOrder: any): Observable<Object> {
    return this.http
      .post(this.url + "order/create/", newOrder, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: "progress", message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
