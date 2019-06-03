import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appFilterButtonActivated]"
})
export class FilterButtonActivatedDirective {
  @Input() appFilterButtonActivated: number;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.appFilterButtonActivated != 0) {
      this.el.nativeElement.style.backgroundColor = "#272f33";
      this.el.nativeElement.style.color = "#FFFFFF";
    } else {
      this.el.nativeElement.style.backgroundColor = "";
      this.el.nativeElement.style.color = "";
    }
  }
}
