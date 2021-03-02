import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return  this.authService.isUserAuthenticated(this.authService.getBearerToken());
  }
}