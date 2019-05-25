import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    ){}

 ngOnInit() {
   // Daten müssen aufjedenfall eingeben werden, wird hier überprüft
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.dialog.open(LoginComponent);
          return;
      }
      //wird gepürft ob die Login Daten richtig waren und dann das entsprechende ausgeführt
     this.loading = true;
     this.authenticationService.login(this.f.username.value, this.f.password.value)
     .pipe(first())
     .subscribe(
         data => {
           //wenn Login richtig war, dann wird man auf diese Seite geleitet
             this.router.navigate(['printer']);
         },
             error => {
                 this.error = error;
                 this.loading = false;
                 //wenn falsche Logindaten, wird immer wieder der Login ausgeführt
                 this.dialog.open(LoginComponent);
           });

}
//damit das Pop-Up Fenster zugeht wenn man sich angemeldet hat
  onLoginClick(): void{
    this.dialogRef.close();
  }
}
