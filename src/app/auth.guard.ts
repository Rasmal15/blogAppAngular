import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn : 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('access_token');
      if (token){
        return true;
      } else{
        this.router.navigate(['login']);
        return false;
      }
  }
}
