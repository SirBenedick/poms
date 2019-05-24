import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timer } from "rxjs";
import {
  IOrder,
  IPrinterData,
  IHelpPageTopic,
  IHelpPage,
  IHelpPageSubtopic
} from "../shared/interfaces";
import { switchMap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  backendUrl = "http://141.19.113.166:8081/";
  mockedURL = "http://5cda86ebeb39f80014a756b7.mockapi.io/";

  //** Mocked Data for offline use */
  mockedOrderData: Array<IOrder> = [
    {
      orderId: 1,
      groupId: 1,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "hoch",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 2,
      groupId: 2,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "hoch",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 3,
      groupId: 3,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "hoch",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 4,
      customer: "Schmittlauch1",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "hoch",
      harz: "schwarz",
      dueDate: "2019-05-23",
      creationDate: "2019-05-22",
      status: "created"
    },
    {
      orderId: 5,
      groupId: 1,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "mittel",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 6,
      groupId: 2,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "mittel",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 7,
      groupId: 3,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "mittel",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 8,
      customer: "Schmittlauch1",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "mittel",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 9,
      groupId: 1,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "niedrig",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 10,
      groupId: 2,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "niedrig",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 11,
      groupId: 3,
      customer: "Schmittlauch",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "niedrig",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    },
    {
      orderId: 12,
      customer: "Schmittlauch1",
      laboratory: "testlabor",
      patient: "Maximum Lauch",
      dentalPrintType: "Schiene",
      priority: "niedrig",
      harz: "schwarz",
      dueDate: "2019-05-19",
      creationDate: "2019-05-19",
      status: "created"
    }
  ];
  mockedPrinterData: Array<IPrinterData> = [
    {
      printer_id: 23,
      name: "TestPrinter1",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.7068181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter2",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.5568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter3",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 1,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.7568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    },
    {
      printer_id: 23,
      name: "TestPrinter4",
      host: "141.19.113.185",
      port: 8080,
      is_printing: 0,
      current_layer: 98,
      max_layer: 176,
      print_start: "11:58:31",
      time_estimated: "01:06:51",
      model_height: 18,
      paused: 0,
      offline: 0,
      progress: 0.1568181818181818,
      estimated_time_remaining: "12h",
      resin_volume: 0.7
    }
  ];
  mockedHelpPage: Array<IHelpPage> = [
    {
      pageTitel: "pageTitel 1",
      topics: [
        {
          topicTitel: "topicTitel 11",
          subtopics: [
            {
              subtopicTitel: "subtopicTitel 111",
              subtopicContent: "subtopicContent 111"
            },
            {
              subtopicTitel: "subtopicTitel 112",
              subtopicContent: "subtopicContent 112"
            }
          ],
        },
        {
          topicTitel: "topicTitel 12",
          subtopics: [
            {
              subtopicTitel: "subtopicTitel 121",
              subtopicContent: "subtopicContent 121"
            },
            {
              subtopicTitel: "subtopicTitel 122",
              subtopicContent: "subtopicContent 122"
            }
          ],
        }
      ]
    },
    {
      pageTitel: "pageTitel 2",
      topics: [
        {
          topicTitel: "topicTitel21",
          subtopics: [
            {
              subtopicTitel: "subtopicTitel211",
              subtopicContent: "subtopicContent211"
            },
            {
              subtopicTitel: "subtopicTitel212",
              subtopicContent: "subtopicContent212"
            }
          ],
        },
        {
          topicTitel: "topicTitel22",
          subtopics: [
            {
              subtopicTitel: "subtopicTitel221",
              subtopicContent: "subtopicContent221"
            },
            {
              subtopicTitel: "subtopicTitel222",
              subtopicContent: "subtopicContent222"
            }
          ],
        }
      ]
    }
  ];

  allOrderData$: Observable<Object>;
  allPrinterData$: Observable<Object>;

  allUngroupedOrders: Array<IOrder> = [];
  allPrinterData: Array<IPrinterData> = [];

  constructor(private http: HttpClient) {
    /** Starts observable and polls all OrderData from Backend */

    this.allOrderData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllOrdersFromBackend()),
      catchError((err, caught) => caught)
    );
    this.allOrderData$.subscribe((allOrderData: Array<IOrder>) => {
      this.allUngroupedOrders = allOrderData;
      // this.allUngroupedOrders = this.mockedOrderData;
    });

    /** Starts observable and polls all PrinterData from Backend */
    this.allPrinterData$ = timer(0, 2000).pipe(
      switchMap((counter: number) => this.pollAllPrinterFromBackend()),
      catchError((err, caught) => caught)
    );
    this.allPrinterData$.subscribe((newPrinterData: Array<IPrinterData>) => {
      // this.allPrinterData = newPrinterData;
      // this.allPrinterData = this.mockedPrinterData;
    });
    //ENDE
  }

  pollAllOrdersFromBackend(): Observable<Object> {
    //** Backendcall */
    // return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllOrdersFromBackend");
    return this.http.get(this.mockedURL + "allOrders");
  }

  pollAllPrinterFromBackend(): Observable<Object> {
    //** Backendcall */
    //return this.http.get(this.url + "echte/url/einfügen/");
    //** Mocked Data */
    // console.log("pollAllPrinterFromBackend");
    return this.http.get(this.mockedURL + "allPrinter");
    // return this.http.get(this.backendUrl + "printer/get/all");
  }

  startPrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/start/" + id);
  }
  stopPrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/stop/" + id);
  }
  togglePrinter(id: Number) {
    return this.http.get(this.backendUrl + "printer/action/toggle/" + id);
  }

  getAllResin(): Promise<Object> {
    return this.http.get(this.backendUrl + "resin/get/all/").toPromise();
  }
  createNewGroup(order: IOrder): Promise<Object> {
    //example API-Call, URL not yet real
    return this.http.get(this.backendUrl + "group/create/").toPromise();
  }

  getAllHelpTopics(): Promise<Object> {
    // return this.http.get(this.backendUrl + "help/all/").toPromise();
    let promiseRes = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 200);
      resolve(this.mockedHelpPage);
    });
    return promiseRes;
  }

  addNewSubtopic(topic: IHelpPageTopic, newSubtopic: IHelpPageSubtopic){
    //Insert Backendcall here
    console.log("Adding new Subtopic to topic", newSubtopic, topic);
  }
}

/**
 * To-Do
 * Frontend:
 * "add Topic" Dialog gestalten
 * auf subtopic in der faq seite draufklicken solle dialog öffnen mit inhalten des IHelpPageSubtopic-Objektes
 * 
 * Backend:
 * createNewGroup()
 * getAllHelpTopics()
 * addNewSubtopic()
 */