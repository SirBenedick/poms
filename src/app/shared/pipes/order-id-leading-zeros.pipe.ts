import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "orderIdLeadingZeros" })
export class OrderIdLeadingZerosPipe implements PipeTransform {
  transform(id: number) {
    let len = 5;
    let input = id.toString();
    if (input.length >= len) return input;
    else return ("000000" + input).slice(-len);
  }
}
