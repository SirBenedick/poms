import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EinstellungenComponent } from 'src/app/pages/einstellungen/einstellungen.component';
import { MatDialogRef } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';
import { IResinType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-harzinfobearbeiten',
  templateUrl: './harzinfobearbeiten.component.html',
  styleUrls: ['./harzinfobearbeiten.component.css']
})
export class HarzinfobearbeitenComponent implements OnInit {
  alterResin: FormGroup;
  harzList: Array<IResinType> = this.backendService.resineData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) { }

  ngOnInit() {
    this.alterResin = new FormGroup({
      resinAltered: new FormControl(),
      resingNew: new FormControl(),
    })
  }
  onSaveButton():void{
    let Harzändern = {
      name: this.alterResin.value.resinAltered,
      new_name: this.alterResin.value.resingNew
    }
   this.backendService.alterResin(Harzändern).then(response => console.log("alterResin", response))
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }

}
