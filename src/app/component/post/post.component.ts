import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  ngOnInit(): void {}
  postForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private postService:PostService,
    private router:Router
  ){
    this.postForm = this.formBuilder.group({
      post:[null],
      description : ['', Validators.required]
    })
  }

  onPostSubmit(){
    if (this.postForm.valid) {
      const formData = new FormData()
      const inputFile = document.querySelector('input[type=file]') as HTMLInputElement;
      if (inputFile.files) {
        const postInput = inputFile.files[0];
        formData.append('post',postInput, postInput.name)
      }
      formData.append('description', this.postForm.get('description')?.value);
      this.postService.createPost(formData).then(res => res.json()).then((data:any) => {
        if(data.code === 'token_not_valid'){
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }
        if (data.status === 201) {  
          this.router.navigate([''])
        }
        console.log(data)
      }).catch(err =>console.error(err))
    }
  }
}
