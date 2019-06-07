import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { BackendService } from "src/app/services/backend.service";
import { EinstellungenComponent } from "src/app/pages/einstellungen/einstellungen.component";
import { MatDialogRef } from "@angular/material";
import { ICategory } from "src/app/shared/interfaces";

@Component({
  selector: "app-kategorieloeschen",
  templateUrl: "./kategorieloeschen.component.html",
  styleUrls: ["./kategorieloeschen.component.css"]
})
export class KategorieloeschenComponent implements OnInit {
  deleteKategorie: FormGroup;
  categoryData: Array<ICategory> = this.backendService.categorysData;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) {}

  ngOnInit() {
    this.deleteKategorie = new FormGroup({
      deleteCategory: new FormControl()
    });
  }
  onSaveButton(): void {
    let categoryDelete = {
      name: this.deleteKategorie.value.deleteCategory
    };
    this.backendService
      .removeCategoryByName(categoryDelete)
      .then(response => this.backendService.loadCategoryData());
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
