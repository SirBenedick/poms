import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSelectedNavElement]'
})
export class SelectedNavElementDirective {
  @Input() appSelectedNavElement: any;
  
  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    if (this.appSelectedNavElement == "true") {
      this.el.nativeElement.style.backgroundColor = "#FFFFFF";
      this.el.nativeElement.style.color = "";
    } else {
      this.el.nativeElement.style.backgroundColor = "";
      this.el.nativeElement.style.color = "";
    }
  }

}
