import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../shared/interfaces";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LogoutComponent } from '../components/pop-ups/logout/logout.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
   //this.router.navigate(["logout"]);
    this.dialog.open(LogoutComponent)

  }
}
