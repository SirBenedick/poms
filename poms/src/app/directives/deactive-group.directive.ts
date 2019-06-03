import { Directive, Input, ElementRef } from '@angular/core';
import { IGroupedOrders } from '../shared/interfaces';

@Directive({
  selector: '[appDeactiveGroup]'
})
export class DeactiveGroupDirective {
  @Input() appDeactiveGroup: IGroupedOrders;
  
  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (this.appDeactiveGroup.status == "printing") {
      this.el.nativeElement.style.backgroundColor = "#d3ecf07a";
      this.el.nativeElement.style.color = "";
    } else {
      this.el.nativeElement.style.backgroundColor = "";
      this.el.nativeElement.style.color = "";
    }
  }

}
