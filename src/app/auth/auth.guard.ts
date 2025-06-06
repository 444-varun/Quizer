import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService: AuthService, private route: Router){}

  canActivate():boolean{
   if(this.authService.isLoggedIn()){
       return true;
   }else{
    this.route.navigate(['/auth/login'])
    return false;
   }
  }
}
