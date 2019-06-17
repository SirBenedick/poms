import { Observable } from "rxjs";

export interface IPrinterData {
  printer_id: number;
  name: string;
  host: string;
  port: number;
  is_printing: Number;
  current_layer: Number;
  max_layer: Number;
  print_start: string;
  time_estimated: string;
  model_height: Number;
  paused: Number;
  offline: Number;
  progress: Number;
  estimated_time_remaining: string;
  resin_volume: Number;
  assigned_group_id?: number;
  email_to_notify?: string;
}

export interface IOrder {
  order_id: number;
  group_id?: number;
  customer_id: number; //DB has list of all customers
  laboratory?: string; //DB has list of all laboratories
  patient: string; //DB has list of all patients
  dental_print_type: string; //DB has list of all dental_print_types
  resin_name: string; //DB has list of all "harzes"
  due_date: string;
  priority: string;
  creation_date: string;
  comment?: string;
  fileScan?: string; //REST-Url to file
  file_scan_name?: string;
  fileSolid?: string; //REST-Url to file
  trackingId?: string;
  shippingWay?: string;
  deliveryCompany?: string;
  status:
    | "created"
    | "isSolid"
    | "postPrint"
    | "cleaned"
    | "postExposure"
    | "sent";
}

export interface IOrderCreateNew {
  customer_id: number;
  patient: string;
  dental_print_type: string;
  resin_name: string;
  due_date: string;
  comment: string;
  status: string;
  scan_file: any;
}

export interface IGroupedOrders {
  group_id: number;
  resin_name: string;
  creation_date: string;
  file_sliced_name?: any; //REST-Url to file
  orders?: Array<IOrder>;
  status: "preprint" | "printing" | "postprint";
}

export interface ICreateNewOrder {
  titel: string;
  Kategorie: string;
}

export interface IFilterOrders {
  resin_name: string;
  priority: "hoch" | "mittel" | "niedrig";
  due_date: any;
  customer_id: string;
}

export interface IFAQPage {
  category: {
    sub_category: Array<{
      title: string;
      video_url?: string;
      content: string;
    }>;
  };
}

export interface IFAQPageSearchResult {
  category: string;
  sub_category: string;
  title: string;
  video_url: string;
  content: string;
}

export interface IFAQPageAlter {
  category: string;
  sub_category: string;
  title: string;
  new_category: string;
  new_sub_category: string;
  new_title: string;
  video_url: string;
  content: string;
}

export interface IFAQPageCreate {
  category: string;
  sub_category: string;
  title: string;
  video_url: string;
  content: string;
}

export interface IResinType {
  resin_name: string;
  color: string;
}

export interface IResinName {
  name: string;
}

export interface ICustomerName {
  name: string;
}

export interface ICategoryName {
  name: string;
}
export interface IAlterResin {
  name: string;
  new_name: string;
}
export interface IAlterCategory {
  name: string;
  new_name: string;
}

export interface IResinDelete {
  name: string;
}

export interface ICategoryDelete {
  name: string;
}

export interface ICustomerDelete {
  customer_id: number;
}

export class User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export enum Role {
  User = "User",
  Admin = "Admin"
}
export interface ISettingsPage {
  pageTitel: string;
  topics: Array<ISettingsPagetopic>;
}

export interface ISettingsPagetopic {
  topicTitel: string;
  subtopics: Array<ISettingsPageSubtopic>;
}
export interface ISettingsPageSubtopic {
  subtopicTitel: string;
  subtopicContent: string;
}

export interface ICategory {
  model_type_name: string;
}

export interface IDrucken {
  upload: File;
  download: File;
  print: File;
  EMail: string;
}

export interface ICustomer {
  customer_id: number;
  name: string;
}

export interface IPrinterNew {
  name: string;
  host: string;
  port: string;
}

export interface IPrinterDataPolling {
  printer_id: number;
  printer_name: string;
  printer$: Observable<IPrinterData>;
  status?: { style: any; message: string };
}
export interface IOrderStatus {
  value: string;
  display_name: string;
}

export interface ISearchResults {
  faq_entry: Array<IFAQPageSearchResult>;
  printer: Array<IPrinterData>;
  order: Array<IOrder>;
}
export interface ISingleSearchResult {
  img_src: string;
  result: string;
  result_small: string;
  original_object?: Object;
}
