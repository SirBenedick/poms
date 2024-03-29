import { Component, OnInit, TemplateRef } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { LoginService } from "./services/login.service";
import { User, Role } from "./shared/interfaces";
import { Router } from "@angular/router";
import { LogoutComponent } from "./components/pop-ups/logout/logout.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  currentUser: User;
  title = "poms";
  logout= false;
  constructor(
    private authService: LoginService,
    public dialog: MatDialog,

  ) {
    //Oberservable, x nimmt currentuser als neuen Wert an
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }
  ngOnInit() {

  }
  //wird geprüft ob der Admin angemeldet ist
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
