import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import path from 'path';
import { Component } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth.guard';
import { NavComponent } from './component/nav/nav.component';
import { PostComponent } from './component/post/post.component';
import { ProfileComponent } from './component/profile/profile.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'nav',
        component : NavComponent
    },
    {
        path : 'post',
        component : PostComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'profile',
        component : ProfileComponent,
        canActivate : [AuthGuard]
    }
];
