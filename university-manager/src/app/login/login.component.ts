import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  login() {
    this.authenticationService.login({username: 'root', password: 'secret'});
  }
  refresh() {
    this.authenticationService.refresh();
  }

}
