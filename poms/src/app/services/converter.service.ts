import { IOrder } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  ordersBackendToFrontend(backendOrders: Array<any>): Array<IOrder>{

  }
}
