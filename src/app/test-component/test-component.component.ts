import { BackendService } from "./../services/backend.service";
import { Component, OnInit } from "@angular/core";

import {
  tap,
  startWith,
  map,
  switchMap,
  catchError,
  take
} from "rxjs/operators";
import { interval, Observable, Subscription, timer } from "rxjs";
import { IUserData } from "../shared/interfaces";

@Component({
  selector: "app-test-component",
  templateUrl: "./test-component.component.html",
  styleUrls: ["./test-component.component.css"]
})
export class TestComponentComponent implements OnInit {
  radioValue = "A";
  style = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };
  data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
  ];
  typiCodeUserData: IUserData;
  userDataSubscription: Subscription;
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.userDataSubscription = timer(3000, 1500)
      .pipe(
        switchMap((id: number) => this.backendService.getUserData(id)),
        catchError((err, caught) => caught),
      )
      .subscribe((userData: IUserData) => {
        console.log("Interval", userData), (this.typiCodeUserData = userData);
      });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userDataSubscription.unsubscribe();
  }
}
