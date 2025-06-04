import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { format } from 'node:path';

declare var $:any;

interface JQuery {
  usPhoneFormat(options?: any): JQuery;
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm:FormGroup;
  
    constructor(
      private auth: AuthService,
      private router: Router, private formBuild: FormBuilder
    ) {
      this.loginForm = this.formBuild.group({
        username: ['', Validators.required],
        password: ['', Validators.required,],
      })
    };
    
  
    ngOnInit():void {

    }

    ngAfterViewInit() {
      console.log('1')
      // Use the custom jQuery plugin after the view has been initialized
      if (typeof $ !== 'undefined') {
        // Assuming you have an input field with id 'phone'
        $('#yourphone').usPhoneFormat({
          format: '1*****7890'
          // Your options here, if any
        });
      }
    }
  
    onSubmit(){
      if (this.loginForm.valid){
        this.auth.login(this.loginForm.value).then(response => response.json()).then(data => {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          if (data.access) {
            this.router.navigate([''])
          }else{
            alert('invalid credentials')
          }
        })
      }
    }
}


