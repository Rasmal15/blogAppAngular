import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { environment } from '../../../environments/environment';
import { CommentService } from '../../services/comment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReplayService } from '../../services/replay.service';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule,NavComponent,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  commentCollapseStates: { [key: number]: boolean } = {};
  replayCollapseStates: { [key: number]: boolean } = {};
  protected posts:any;
  protected user:any;
  protected postedUser:any
  protected baseUrl:any = environment.apiUrl;
  commentForm:FormGroup;
  showComments: { [key: number]: boolean } = {};
  showReplays: { [key: number]: boolean } = {};
  replayForm:FormGroup;
  showPopup:boolean = false;

  ngOnInit(): void {
      
  }

  constructor(
    private homeService: HomeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private replayService: ReplayService,
    private postService: PostService

  ){
    this.homeService.home().then(res => res.json()).then((data:any) => {
      if(data.code === 'token_not_valid'){
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }

      this.posts = data.posts;
      this.user = data.user;
      this.posts.forEach((post:any) => {
        this.commentCollapseStates[post.id] = true
        this.showComments[post.id] = true
        post.posted_comment.forEach((comment:any) => {
          this.replayCollapseStates[comment.id] = true;
          this.showReplays[comment.id] = true
        })
      });
    });

    this.commentForm = this.formBuilder.group({
      comment : ''
    });

    this.replayForm = this.formBuilder.group({
      replay : ''
    });

  }

  toggleComments(postId: number) {
    this.commentCollapseStates[postId] = !this.commentCollapseStates[postId];
    this.showComments[postId] = true
  }

  toggleReplays(commentId: number) {
    this.replayCollapseStates[commentId] = !this.replayCollapseStates[commentId]
    this.showReplays[commentId] = true
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  isLiked(userId: number, likes: number[]): boolean {
    return likes.includes(userId);
  }

  isNotLiked(userId: number, likes: number[]) : boolean{
    return !likes.includes(userId);
  }

  onCommentSubmit(postId: number,event:any) {
    event.preventDefault();
    this.commentService.onCommentSubmit(postId,this.commentForm.value).then(res => res.json()).then((data:any)=>{
      const comment_div = document.querySelector(`.comment_lists-${postId}`);
      const new_comment = document.createElement('div');
      new_comment.setAttribute('id',`comment-${data.comment.id}`);
      new_comment.classList.add('position-relative');
      new_comment.innerHTML = this.commentService.commentTemplate(data)
      comment_div?.appendChild(new_comment);
    })
    this.commentForm.get('comment')?.setValue('');  
  }

  onReplaySubmit(commentId: number, event: any){
    const formData = {
      'replay' : this.replayForm.value,
      'comment_id' : commentId
    }    
    event.preventDefault();
    this.replayService.replaySubmit(formData).then(res => res.json()).then((data:any) => {
      console.log(data)
      const comment_id = data.replay.comment
      // Append the new review to the list
      const replaylist = document.querySelector(`.replay_lists-${comment_id}`);
      const newReplay = document.createElement('div');
      newReplay.classList.add(`.replay-list-${data.replay.id}`);
      newReplay.innerHTML = this.replayService.replayTemplate(data)
      replaylist?.appendChild(newReplay);
      this.replayForm.get('replay')?.setValue('');
    })  
  }

  likePost (postId:any){
    const post_id = { 'post_id' : postId }
    this.postService.likePost(post_id).then(res => res.json()).then((data:any) => {
      console.log(data)
      const iTag = document.getElementById(`i-${postId}`)
      const count = document.getElementById(`like_count-${postId}`)
      console.log(iTag)
      // Update the like button UI based on the response
      if (iTag && count) {
        if (data.liked) {
            // The user liked the post, update the like count
            iTag.style.color = "red";
            count.textContent = data.like_count

            // button.textContent = 'Liked';
        } else{
            iTag.style.color = "blue";
            count.textContent = data.like_count
        }
    }
    })
  }

  likeComment (commentId:any) {
    const comment_id = { 'comment' : commentId }
    this.commentService.onCommentLike(comment_id).then(res => res.json()).then((data:any) => {
      const iTag = document.getElementById(`i-${commentId}`)
      const count = document.getElementById(`comment_like_count-${commentId}`)
      // Update the like button UI based on the response
      if (iTag && count) {
        if (data.liked) {
            // The user liked the post, update the like count
            iTag.style.color = "red";
            count.textContent = data.like_count

            // button.textContent = 'Liked';
        } else{
            iTag.style.color = "blue";
            count.textContent = data.like_count
        }
    }
    })
  }
  
}
