import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { EinstellungenComponent } from "src/app/pages/einstellungen/einstellungen.component";
import { MatDialogRef } from "@angular/material";
import { BackendService } from "src/app/services/backend.service";

@Component({
  selector: "app-neues-harz",
  templateUrl: "./neues-harz.component.html",
  styleUrls: ["./neues-harz.component.css"]
})
export class NeuesHarzComponent implements OnInit {
  newHarz: FormGroup;
  constructor(
    private backendService: BackendService,
    public dialogRef: MatDialogRef<EinstellungenComponent>
  ) {}

  ngOnInit() {
    this.newHarz = new FormGroup({
      harzname: new FormControl(),
      harzfarbe: new FormControl(),
    });
  }
  onSaveButton(): void {
    let newHarzcolor = {
      name: this.newHarz.value.harzname,
      color: this.newHarz.value.harzfarbe,
    };
    this.backendService
      .createResin(newHarzcolor)
     .then(response => this.backendService.loadResinData());
  }

  onBreakButton(): void {
    this.dialogRef.close();
  }
}
