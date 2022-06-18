import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private router: Router, private cookies: CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
        const isAuthenticated: boolean = ( this.cookies.get('isAuthenticated') === 'true' )

        if (!isAuthenticated) {
            this.router.navigate(['login'])
            return false
        }
        return true;
  }
  
}
