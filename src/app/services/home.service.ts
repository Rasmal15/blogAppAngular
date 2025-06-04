import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8000/';
  private token = localStorage.getItem('access_token')

  constructor(private router:Router) { }

  home(){
    return fetch(this.apiUrl,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.token}`
      }
    })
  }
}
