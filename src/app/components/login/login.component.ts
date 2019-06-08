import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { first } from "rxjs/operators";
import { MatDialog, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: LoginService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {

    // Data must be entered in any case, will be checked here
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid, if one of two is empty
    if (this.loginForm.invalid) {
      alert("Bitte geben Sie einen Benutzernamen und Password ein!")
      return;
    }

    //if login correct, then do this
    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          //if login is right, navigate to the page "order"
          this.router.navigate(["order"]);
        },
        error => {
          this.error = error;
          this.loading = false;
          //if both false
          alert("Benutzername oder Password falsch!")
        }
      );
  }
}
