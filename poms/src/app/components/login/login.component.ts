import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  username: String;
  password: String;

  ngOnInit() {
  }

  login():void{
    if(this.username == "admin" && this.password == "password"){
      this.router.navigate(['order']);
    } else{
      alert("False login");
    }
  }
}
