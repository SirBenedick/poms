import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "estimatedTime" })
export class EstimatedTimePipe implements PipeTransform {
  transform(time: string) {
    if (time == null) return "";
    
    let hours = parseInt(time.slice(0, 2));
    let minutes = parseInt(time.slice(3, 5));
    let seconds = parseInt(time.slice(6));

    if (hours == 0 && minutes == 0 && seconds == 0) {
      return "";
    } else if (hours > 0) {
      return `${hours}h ${minutes}min`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return `${seconds}s`;
    }
  }
  //unter 1min
  //unter 1h
  //alles 00 dann nichts
}
