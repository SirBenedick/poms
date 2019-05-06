import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'
})
export class BackendService {
  url = 'https://jsonplaceholder.typicode.com/users/';


  constructor(private http: HttpClient) { }

  getUserData(id: number): Observable<Object>{
    return this.http.get(this.url + String(id+1));
  }

  testLog(): void{
    console.log("Void");
  }
}
