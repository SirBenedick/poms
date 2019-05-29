import { IOrder } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  ordersBackendToFrontend(backendOrderFormat: Array<any>): Array<IOrder>{
    let frontendOrderFormat: Array<IOrder> = [];

    backendOrderFormat.forEach(order => {
      frontendOrderFormat.push({
        orderId: order.order_id,
        groupId: order.group_id,
        customer: order.customer_id,
        patient: order.patient,
        dentalPrintType: order.dental_print_type,
        harz: order.resin_name,
        dueDate: order.due_date,
        priority: "hoch",
        creationDate: order.creation_date,
        comment: order.comment,
        fileScan: order.file_scan_name,
        fileSolid: order.file_solid_name,
        status: order.status,
      });
      
    });
    return frontendOrderFormat;
  }
}
