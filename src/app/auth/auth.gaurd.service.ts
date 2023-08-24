import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {

  constructor(private authService : AuthService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.userSubject.pipe(take(1), map(
      user => {
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        else{
          return this.router.createUrlTree(['/auth']);
        }
      }
    ));
  }
}
