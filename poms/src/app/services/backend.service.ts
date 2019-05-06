import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'
})
export class BackendService {
  url = 'http://192.168.56.101:8082/';


  constructor(private http: HttpClient) { }

  getUserData(id: number): Observable<Object>{
    return this.http.get(this.url + String(id+1));
  }

  testLog(): void{
    console.log("Void");
  }

  printerGetAll(): Observable<Object>{
    return this.http.get(this.url + "printer/get/all/");
  }
  printerGet(id: number): Observable<Object>{
    return this.http.get(this.url + String(id));
  }
}
