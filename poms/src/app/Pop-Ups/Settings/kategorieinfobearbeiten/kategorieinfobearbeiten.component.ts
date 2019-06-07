import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { EinstellungenComponent } from 'src/app/pages/einstellungen/einstellungen.component';
import { MatDialogRef } from '@angular/material';
import { ICategory } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-kategorieinfobearbeiten',
  templateUrl: './kategorieinfobearbeiten.component.html',
  styleUrls: ['./kategorieinfobearbeiten.component.css']
})
export class KategorieinfobearbeitenComponent implements OnInit {
  alterCategory: FormGroup
  categoryData: Array<ICategory> = this.backendService.categorysData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) { }

  ngOnInit() {
    this.alterCategory= new FormGroup({
      categoryAltered: new FormControl(),
      categoryNew: new FormControl(),
    })
  }
  onSaveButton():void{
    let Kategorieändern = {
      name: this.alterCategory.value.categoryAltered,
      new_name: this.alterCategory.value.categoryNew,
    }
   this.backendService.alterCategory(Kategorieändern).then(response => console.log("alterCategory", response))
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
