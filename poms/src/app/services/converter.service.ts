import { IOrder } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  ordersBackendToFrontend(backendOrderFormat: Array<any>): Array<IOrder>{
    let frontendOrderFormat: Array<IOrder> = [];
    console.log("incoming: ", backendOrderFormat )
    backendOrderFormat.forEach(order => {
      frontendOrderFormat.push({
        order_id: order.order_id,
        group_id: order.group_id,
        customer: order.customer_id,
        patient: order.patient,
        dental_print_type: order.dental_print_type,
        resin_name: order.resin_name,
        dueDate: order.due_date,
        priority: "hoch",
        creation_date: order.creation_date,
        comment: order.comment,
        fileScan: order.file_scan_name,
        fileSolid: order.file_solid_name,
        status: order.status,
      });
      
    });
    console.log("going: ", frontendOrderFormat );
    return frontendOrderFormat;
  }
}
