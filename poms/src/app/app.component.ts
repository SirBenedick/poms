import { Component, OnInit } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { MatDialog } from "@angular/material";
import { LoginService } from "./services/login.service";
import { User, Role } from "./shared/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  currentUser: User;
  title = "poms";

  constructor(
    private router: Router,
    private authService: LoginService,
    public dialog: MatDialog
  ) {
    //Oberservable, x nimmt currentuser als neuen Wert an
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    //Login erscheint direkt wenn man auf das poms gehen will
    if ("!currentUser") {
      setTimeout(() => this.dialog.open(LoginComponent));
    }
  }
//wird geprüft ob der Admin angemeldet ist
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  //wenn man sich ausloggt, wird man wieder die Login Seite aufgerufen und man kann sich wieder einloggen
  logout() {
    this.authService.logout();
    this.dialog.open(LoginComponent);
  }
}
