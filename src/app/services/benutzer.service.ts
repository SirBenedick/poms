import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { LoginService } from "./login.service";
@Injectable({
  providedIn: "root"
})
export class BenutzerService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: LoginService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (
        //check both, otherwise both have no ok for the page
        route.data.roles &&
        route.data.roles.indexOf(currentUser.role) === -1
      ) {
        // role not authorised so redirect to order page
        alert(
          "Du darfst nicht auf diese Seite, bitte wende dich an einen Administrator."
        );
        this.router.navigate(["order"]);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["login"]);
    return false;
  }
}
