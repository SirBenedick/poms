import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ICreateNewOrder } from "src/app/shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-new-order",
  templateUrl: "./create-new-order.component.html",
  styleUrls: ["./create-new-order.component.css"]
})
export class CreateNewOrderComponent implements OnInit {
  newDate = new Date();
  orderCategories= ["Zahn", "Gebiss"];
  docName=["Iterate&Generate", "SEP 2019"];
  priority=["niedrig", "mittel", "hoch"];
  newOrderForm = new FormGroup({
    auftragsTitel: new FormControl('Auftragstitel', [Validators.minLength(2), Validators.required]),
    auftragsNummer: new FormControl('', [Validators.minLength(1), Validators.required]),
    kategorie: new FormControl('', [Validators.required]),
    praxisName: new FormControl('',[Validators.required]),
    prioritaet: new FormControl('',[Validators.required]),
    kommentar: new FormControl(''),
    erstellt_am: new FormControl('',[Validators.required]),
    faellig_am: new FormControl('',[Validators.required]),
    namePatient: new FormControl('',[Validators.required]),
    orderTypes: new FormControl('',[Validators.required]),
  });
//   Muss hier noch ein Validator rein?
//   , {
//     validator: MustMatch('password', 'confirmPassword')
// });

 

  constructor(
    public dialogRef: MatDialogRef<CreateNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateNewOrder
  ) {}
  ngOnInit() {}

  onClick():void{
    if(this.newOrderForm){
      console.log("Form Submitted");
      console.log(this.newOrderForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
