export interface IPrinterData {
  printer_id: Number;
  name: String;
  host: String;
  port: number;
  is_printing: Number;
  current_layer: Number;
  max_layer: Number;
  print_start: String;
  time_estimated: String;
  model_height: Number;
  paused: Number;
  offline: Number;
  progress: Number;
  estimated_time_remaining: String;
  resin_volume: Number;
}

export interface IOrder {
  orderId: Number;
  groupId?: Number;
  customer: String; //DB has list of all customers
  laboratory: String; //DB has list of all laboratories
  patient: String; //DB has list of all patients
  dentalPrintType: String; //DB has list of all dentalPrintTypes
  harz: String; //DB has list of all "harzes"
  dueDate: String;
  priority: String;
  creationDate: String;
  comment?: String;
  fileScan?: String; //REST-Url to file
  fileSolid?: String; //REST-Url to file
  trackingId?: String;
  shippingWay?: String;
  deliveryCompany?: String;
  status:
    | "created"
    | "isSolid"
    | "postPrint"
    | "cleaned"
    | "postExposure"
    | "sent";
}

export interface IGroupedOrders {
  groupId: Number;
  harz: String;
  creationDate: String;
  slicedFile?: any; //REST-Url to file
  status: "preprint" | "printing" | "postprint";
}

export interface ICreateNewOrder {
  titel: String;
  Kategorie: String;
}
