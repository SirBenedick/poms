import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  url = "http://141.19.113.166:8081/";

  uploadScan(fileToUpload: any, id: number) {
    let input = new FormData();
    input.append("scan_file", fileToUpload);

    return this.http.post(this.url + "order/upload/scan/" + id, input, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
