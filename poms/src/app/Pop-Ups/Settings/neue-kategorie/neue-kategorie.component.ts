import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EinstellungenComponent } from 'src/app/pages/einstellungen/einstellungen.component';
import { MatDialogRef } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-neue-kategorie',
  templateUrl: './neue-kategorie.component.html',
  styleUrls: ['./neue-kategorie.component.css']
})
export class NeueKategorieComponent implements OnInit {
  newKategorie : FormGroup;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>,
  ) { }

  ngOnInit() {
    this.newKategorie = new FormGroup({
      kategoriename: new FormControl(),
    })

  }
  onSaveButton():void{
     let newCategoryName = {
      name: this.newKategorie.value.kategoriename
     }
    this.backendService.createCategory(newCategoryName).then(response => console.log("createResin", response))
  }

  
  onBreakButton(): void {
    this.dialogRef.close();
  }
}
