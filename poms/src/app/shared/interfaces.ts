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
  assigned_group_id?: number;
  email_to_notify?: string;
}

export interface IOrder {
  order_id: number;
  group_id?: number;
  customer_id: number; //DB has list of all customers
  laboratory?: String; //DB has list of all laboratories
  patient: String; //DB has list of all patients
  dental_print_type: String; //DB has list of all dental_print_types
  resin_name: String; //DB has list of all "harzes"
  due_date: String;
  priority: String;
  creation_date: string;
  comment?: String;
  fileScan?: string; //REST-Url to file
  file_scan_name?: string;
  fileSolid?: string; //REST-Url to file
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

export interface IOrderCreateNew {
  customer_id: number;
  patient: String;
  dental_print_type: String;
  resin_name: String;
  due_date: String;
  comment: String;
  status: String;
  scan_file: any;
}

export interface IGroupedOrders {
  group_id: number;
  resin_name: string;
  creationDate: String;
  fileSliced?: any; //REST-Url to file
  orders?: Array<IOrder>;
  status: "preprint" | "printing" | "postprint";
}

export interface ICreateNewOrder {
  titel: String;
  Kategorie: String;
}

export interface IFilterOrders {
  resin_name: String;
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
//  export interface IHelpPage {
//    pageTitel: String;
//    topics: Array<IHelpPageTopic>;
//  }

//  export interface IHelpPageTopic {
//    topicTitel: String;
//    subtopics: Array<IHelpPageSubtopic>;
//  }

//  export interface IHelpPageSubtopic {
//    subtopicTitel: String;
//    subtopicContent: String;
//    videoURL?: String;
//  }

export interface IResinType {
  resin_name: String;
}

export interface IResinName {
  name: string;
}

export interface ICustomerName {
  name: string;
}
// MS-Auf Backend warten bis es steht
// export interface ICategoryName{

// }

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
  pageTitel: String;
  topics: Array<ISettingsPagetopic>;
}

export interface ISettingsPagetopic {
  topicTitel: String;
  subtopics: Array<ISettingsPageSubtopic>;
}
export interface ISettingsPageSubtopic {
  subtopicTitel: String;
  subtopicContent: String;
}

export interface ICategory {
  category_name: String;
}

export interface IDrucken {
  upload: File;
  download: File;
  print: File;
  EMail: String;
}

export interface ICustomer {
  customer_id: number;
  name: string;
}

export interface IPrinterNew {
  name: String;
  host: String;
  port: String;
}
