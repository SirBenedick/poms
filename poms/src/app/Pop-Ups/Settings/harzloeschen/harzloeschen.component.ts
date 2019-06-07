import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EinstellungenComponent } from 'src/app/pages/einstellungen/einstellungen.component';
import { MatDialogRef } from '@angular/material';
import { IResinType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-harzloeschen',
  templateUrl: './harzloeschen.component.html',
  styleUrls: ['./harzloeschen.component.css']
})
export class HarzloeschenComponent implements OnInit {
  resinDelete : FormGroup;
  harzList: Array<IResinType> = this.backendService.resineData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>,
    ) { }

  ngOnInit(
  ) { 
    this.resinDelete = new FormGroup({
      resinName: new FormControl(),
    })
  
  }

  onSaveButton():void{
   let deleteResin = {
       name: this.resinDelete.value.resinName
     }

    this.backendService.removeResinByName(deleteResin).then(response => console.log("removeResinByName", response))
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
