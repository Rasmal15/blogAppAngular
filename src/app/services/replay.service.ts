import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {

  constructor() { }
  private baseUrl = environment.apiUrl
  private apiUrl = `${this.baseUrl}/replay/replay`
  private token = localStorage.getItem('access_token')

  replaySubmit(data:any){
    return fetch(this.apiUrl,{
      method : 'POST',
      body : JSON.stringify(data),
      headers : {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.token}`
      }
    })
  }

  replayTemplate (data:any) {
    const replay_template = `
      <style>
      body{
          padding-top:20px;
      }
      .img-fluid {
          max-width: 100%;
          height: auto;
      }

      .replay-comment, .comment-form {
          display: contents;
      }
      .card {
          margin-bottom: 30px;
      }

      .overflow-hidden {
          overflow: hidden!important;
      }

      .p-0 {
          padding: 0!important;
      }

      .mt-n5 {
          margin-top: -3rem!important;
      }

      .linear-gradient {
          background-image: linear-gradient(#50b2fc,#f44c66);
      }

      .rounded-circle {
          border-radius: 50%!important;
      }

      .align-items-center {
          align-items: center!important;
      }

      .justify-content-center {
          justify-content: center!important;
      }

      .d-flex {
          display: flex!important;
      }

      .rounded-2 {
          border-radius: 7px !important;
      }

      .bg-light-info {
          --bs-bg-opacity: 1;
          background-color: rgba(235,243,254,1)!important;
      }

      .card {
          margin-bottom: 30px;
      }

      .position-relative {
          position: relative!important;
      }

      .shadow-none {
          box-shadow: none!important;
      }

      .overflow-hidden {
          overflow: hidden!important;
      }

      .border {
          border: 1px solid #ebf1f6 !important;
      }

      .fs-6 {
          font-size: 1.25rem!important;
      }

      .mb-2 {
          margin-bottom: 0.5rem!important;
      }

      .d-block {
          display: block!important;
      }

      a {
          text-decoration: none;
      }

      .user-profile-tab .nav-item .nav-link.active {
          color: #5d87ff;
          border-bottom: 2px solid #5d87ff;
      }

      .mb-9 {
          margin-bottom: 20px!important;
      }

      .fw-semibold {
          font-weight: 600!important;
      }
      .fs-4 {
          font-size: 1rem!important;
      }

      .card, .bg-light {
          box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%);
      }

      .fs-2 {
          font-size: .75rem!important;
      }

      .rounded-4 {
          border-radius: 4px !important;
      }

      .ms-7 {
          margin-left: 30px!important;
      }
    </style>
    <div class="p-4 rounded-2 bg-light ms-7">
        <div class="d-flex align-items-center gap-3">
            <img src="${this.baseUrl}/${data.replay.user.user_profile.profile_picture}" alt="" class="rounded-circle" width="40" height="40">
            <h6 class="fw-semibold mb-0 fs-4">${data.replay.username }</h6>
        <span class="fs-2"><span class="p-1 bg-muted rounded-circle d-inline-block"></span> just now</span>
        </div>
        <p class="my-3">
        ${data.replay.replay}
        </p>
    </div>
    `
    return replay_template;
  }
}
