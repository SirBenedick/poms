import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() druckerStatus: String;
  @Input() fuellstand: String;
  @Input() details: String;
  @Input() druckFortschritt: String;
  @Input() restlicheDruckzeit: String;
  @Input() printStart: String;
  @Input() temperatur: String;
  @Input() printerName: String;

  
  // public chartType: String = "line";

  // public chartDatasets: Array<any> =[{data: [2,4,5,6,8,19,50,100]}];
  // public chartColors: Array<any> = [{ backgroundColor: 'rgba(105,0,132,.2)',
  // borderColor: 'rgba(200, 99, 132, .7)',
  // borderWidth: 2,}];
  // public chartOptions: any ={
  //   responsive: true
  // }

  constructor() { }

  ngOnInit() {
  }
   
    
  }
