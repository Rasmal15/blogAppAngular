import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private token = localStorage.getItem('access_token')
  private baseUrl = environment.apiUrl
  private apiUrl = `${this.baseUrl}/post/post`
  constructor() { }
  createPost(data:any){
    return fetch(this.apiUrl,{
      method : 'POST',
      body : data,
      headers : {
        'Authorization': `Bearer ${this.token}`,
      }
    })
  }

  likePost (data:any) {
    return fetch (`${this.apiUrl}/like`, {
      method : 'POST',
      body : JSON.stringify(data),
      headers:{
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.token}`,
      }
    })
  }
}
