import { Injectable } from '@angular/core';
import * as axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }
  private baseUrl = 'http://labo5.local';
  private oAuth = this.baseUrl + '/oauth/token';
  private base = this.baseUrl + '/user/login?_format=json';

  setLocalStorage(response) {
    const d = new Date();
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('token_expiration', d.getTime() +  response.expires_in);
  }

  login(data) {
    const _this = this;
    axios.post(this.oAuth,
      `grant_type=password&` +
        `client_id=a9760718-2183-4c86-b2d5-d442fd8dd874&` +
        `client_secret=testtest&` +
        `scope=app&` +
        `username=${data.username}&` +
        `password=${data.password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
    .then(function (response) {
      console.log(response);
      _this.setLocalStorage(response.data);
      _this.router.navigate(['dashboard']);
    })
    .catch(function (error) {
      console.log(error);
    });
  axios.post(this.base, {name: data.username, pass: data.password},
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      localStorage.setItem('csrf_token', response.data.csrf_token);
    }).catch(error => console.log(error));
  }
  refresh() {
    const _this = this;
    axios.post(this.oAuth,
      `grant_type=refresh_token&` +
        `refresh_token=${localStorage.getItem('refresh_token')}&` +
        `client_id=a9760718-2183-4c86-b2d5-d442fd8dd874&` +
        `client_secret=testtest&` +
        `scope=app`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
    .then(function (response) {
      console.log(response);
      _this.setLocalStorage(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
