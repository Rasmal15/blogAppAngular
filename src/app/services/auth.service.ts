import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/token/'
  constructor(private http:HttpClient, private router:Router ) {}

  login(data:any) {
    return fetch(this.apiUrl,{
      method : 'POST',
      body : JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    })
  };


  refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
  }

}
