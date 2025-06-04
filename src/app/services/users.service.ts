import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8000/users/userinfo';
  private token = localStorage.getItem('access_token');
  constructor() { }

  userData(){
    return fetch(this.apiUrl,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.token}`
      }
    })
  }
}
