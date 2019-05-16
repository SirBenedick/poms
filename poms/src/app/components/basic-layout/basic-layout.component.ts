import { Subscription } from 'rxjs';
import { Observable, timer } from 'rxjs';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { IPrinterData } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material'
import { CreateNewOrderComponent } from 'src/app/components/create-new-order/create-new-order.component';
@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {

  printerSubscription: Observable<Object>;

  constructor(private backendService: BackendService,
  public dialog: MatDialog) { 
  }
  
  ngOnInit() {
    console.log("basic ngOnInit")
    this.printerSubscription = this.backendService.allPrinterDataObservable
    // .subscribe((newPrinterData: Array<IPrinterData>) => {
    //   console.log("Polling new Data", newPrinterData);
    //   // this.allPrinterData = newPrinterData;
    // });

  }

  newOrder(){
    console.log("function called");
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  openDialog():void {
    const dialogRef = this.dialog.open(CreateNewOrderComponent);

     dialogRef.afterClosed().subscribe(result =>{
      console.log("The dialog was closed");
    });
  }
}
