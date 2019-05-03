import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appSidebar]",
  exportAs: "appSidebar"
})
export class SidebarDirective {
  click: boolean = false;
  constructor() {}

  @HostListener("click") onClick() {
    this.click=!this.click;
    console.log("Clicked", this.click);
  }
}
