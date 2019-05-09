export interface IloraData{
    externalDeviceId: string;
    dataframe: string;
    timestamp: string;
    type:string;
};

export interface IUserData {
    "id": number;
    "name": string;
    "username": string;
    "email": string;
    "address": {
      "street": string;
      "suite": string;
      "city": string;
      "zipcode": string;
      "geo": {
        "lat": string;
        "lng": string;
      }
    },
    "phone": string;
    "website": string;
    "company": {
      "name": string;
      "catchPhrase": string;
      "bs": string;
    }
  }
  export interface IPrinterData{
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
  }